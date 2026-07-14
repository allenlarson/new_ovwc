import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

// Give the free-tier cluster time to wake from an idle pause instead of
// failing instantly on the first request after inactivity.
const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  retryWrites: true,
  retryReads: true,
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Reuse connection across HMR reloads in dev
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;
