// backend/routes/user-profile-photo.js
import express from 'express';
import { localPhotoStore } from './upload-profile-photo.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const hasAwsCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'Users';

let dynamoClient = null;
let DynamoCommands = null;

if (hasAwsCredentials) {
  try {
    const dynamoModule = await import('@aws-sdk/client-dynamodb');
    dynamoClient = new dynamoModule.DynamoDBClient({ region: AWS_REGION });
    DynamoCommands = dynamoModule;
  } catch (e) {
    // Graceful fallback
  }
}

router.get('/user-profile-photo/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  // 1. Check AWS DynamoDB if available
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
      // Fallback
    }
  }

  // 2. Fallback to local in-memory store
  const photoUrl = localPhotoStore ? localPhotoStore.get(email) || null : null;
  return res.status(200).json({ success: true, photoUrl });
});

export default router;
