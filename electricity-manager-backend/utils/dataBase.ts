import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connecting to MongoDB:', error);
  }
};
