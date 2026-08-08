import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = MongoClient.connect(uri, options);
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = MongoClient.connect(uri, options);
}

export default clientPromise;