import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userType, email } = req.body;

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error(
        'MONGODB_URI is not defined in the environment variables.'
      );
    }

    const client = await MongoClient.connect(mongoURI);
    const db = client.db();

    await db.collection('subscriptions').insertOne({ userType, email });

    client.close();

    res.status(200).json({ message: 'Subscribed successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
