import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

// In-memory / file-based fallback store for profile photos
const localPhotoStore = new Map();

// AWS Config (checks if valid credentials exist)
const hasAwsCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'fitai-profile-photos';
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Users';

let s3Client = null;
let dynamoClient = null;
let S3Commands = null;
let DynamoCommands = null;

// Gracefully attempt to load AWS SDK if credentials are provided
if (hasAwsCredentials) {
  try {
    const s3Module = await import('@aws-sdk/client-s3');
    const dynamoModule = await import('@aws-sdk/client-dynamodb');
    s3Client = new s3Module.S3Client({ region: AWS_REGION });
    dynamoClient = new dynamoModule.DynamoDBClient({ region: AWS_REGION });
    S3Commands = s3Module;
    DynamoCommands = dynamoModule;
    console.log('✅ AWS SDK initialized successfully for S3 & DynamoDB');
  } catch (err) {
    console.warn('⚠️ AWS SDK could not be loaded, using local storage:', err.message);
  }
}

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper to create unique filename
const generateFileName = (originalName) => {
  const ext = path.extname(originalName) || '.jpg';
  const id = crypto.randomBytes(16).toString('hex');
  return `profile-${id}${ext}`;
};

// Route: POST /upload-profile-photo
router.post('/upload-profile-photo', upload.single('photo'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ success: false, message: 'Email and photo required' });
  }

  const filename = generateFileName(file.originalname);
  let imageUrl = '';

  // 1. Try AWS S3 + DynamoDB if successfully loaded
  if (s3Client && dynamoClient && S3Commands && DynamoCommands) {
    try {
      const s3Key = `profile-images/${filename}`;
      await s3Client.send(new S3Commands.PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      imageUrl = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${s3Key}`;

      await dynamoClient.send(new DynamoCommands.UpdateItemCommand({
        TableName: TABLE_NAME,
        Key: { email: { S: email } },
        UpdateExpression: 'SET profilePhotoUrl = :url',
        ExpressionAttributeValues: {
          ':url': { S: imageUrl }
        }
      }));

      console.log(`✅ Photo uploaded to S3 & DynamoDB for ${email}`);
      return res.status(200).json({ success: true, imageUrl, storage: 'aws-s3' });
    } catch (awsErr) {
      console.warn('⚠️ AWS S3/DynamoDB upload failed, falling back to local storage:', awsErr.message);
    }
  }

  // 2. Fallback: Save file locally in uploads/
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const localFilePath = path.join(uploadsDir, filename);
    fs.writeFileSync(localFilePath, file.buffer);

    const host = req.get('host') || 'localhost:5001';
    const protocol = req.protocol || 'http';
    imageUrl = `${protocol}://${host}/uploads/${filename}`;

    localPhotoStore.set(email, imageUrl);

    console.log(`✅ Photo saved locally for ${email}: ${imageUrl}`);
    return res.status(200).json({ success: true, imageUrl, storage: 'local' });
  } catch (err) {
    console.error('❌ Upload failed completely:', err);
    return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
});

// Route: GET /user-profile-photo/:email
router.get('/user-profile-photo/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  if (dynamoClient && DynamoCommands) {
    try {
      const result = await dynamoClient.send(new DynamoCommands.GetItemCommand({
        TableName: TABLE_NAME,
        Key: { email: { S: email } },
        ProjectionExpression: 'profilePhotoUrl'
      }));

      const photoUrl = result.Item?.profilePhotoUrl?.S || null;
      if (photoUrl) {
        return res.status(200).json({ success: true, photoUrl });
      }
    } catch (err) {
      console.warn('⚠️ Error fetching photo from DynamoDB, checking local store:', err.message);
    }
  }

  const localUrl = localPhotoStore.get(email) || null;
  return res.status(200).json({ success: true, photoUrl: localUrl });
});

export default router;
export { localPhotoStore };
