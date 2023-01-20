import { Schema, model } from 'mongoose';
import { ISwitchPoint } from '../types';
import mongoose from 'mongoose';

const switchPointSchema = new Schema<ISwitchPoint>(
  {
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    highLimit: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'switchpoints', timestamps: true },
);

export const SwitchPoint = model<ISwitchPoint>(
  'SwitchPoint',
  switchPointSchema,
);
