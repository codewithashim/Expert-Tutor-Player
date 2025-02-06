import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare a global variable to store the cached connection
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache | undefined;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached = globalWithMongoose.mongoose = {
      conn: null,
      promise: mongoose.connect(MONGODB_URI!, opts),
    };
  }

  try {
    const conn = await cached.promise;
    cached.conn = conn;
    if (!conn) {
      throw new Error('Failed to connect to the database');
    }
    return conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default dbConnect;