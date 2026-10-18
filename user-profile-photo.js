// backend/routes/user-profile-photo.js
import express from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const router = express.Router();
const dynamo = new DynamoDBClient({ region: 'us-east-1' });

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

export default router;
