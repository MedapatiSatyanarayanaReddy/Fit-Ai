// /backend/routes/upload-profile-photo.js
import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';


dotenv.config();
const router = express.Router();

// S3 + DynamoDB config
const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const BUCKET_NAME = 'fitai-profile-photos';
const TABLE_NAME = 'Users';

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to create unique filename
const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  const id = crypto.randomBytes(16).toString('hex');
  return `profile-images/${id}${ext}`;
};



// Route: POST /api/upload-profile-photo
router.post('/upload-profile-photo', upload.single('photo'), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ success: false, message: 'Email and photo required' });
  }

  const filename = generateFileName(file.originalname);

  try {
    // Upload to S3
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    const imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`;

    // Save image URL to DynamoDB
    await dynamo.send(new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { email: { S: email } },
      UpdateExpression: 'SET profilePhotoUrl = :url',
      ExpressionAttributeValues: {
        ':url': { S: imageUrl }
      }
    }));
    router.get('/user-profile-photo/:email', async (req, res) => {
        const email = decodeURIComponent(req.params.email);
        try {
          const result = await dynamo.send(new GetItemCommand({
            TableName: 'Users',
            Key: { email: { S: email } },
            ProjectionExpression: 'profilePhotoUrl'
          }));
      
          const photoUrl = result.Item?.profilePhotoUrl?.S || null;
          return res.status(200).json({ success: true, photoUrl });
        } catch (err) {
          console.error('Error fetching photo from DynamoDB:', err);
          return res.status(500).json({ success: false, error: err.message });
        }
      });
      

    res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
});

export default router;
