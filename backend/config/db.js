import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edupulse_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    console.log(`[Database Name] ${conn.connection.name}`);
    console.log(`[Compass URI] Connect MongoDB Compass to: ${uri}`);
    return conn;
  } catch (err) {
    console.error(`[Database Error] Could not connect to MongoDB at ${uri}: ${err.message}`);
    throw err;
  }
};
