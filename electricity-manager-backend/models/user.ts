import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  passWordHash: string;
  timeZone: string;
  switchPoints: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passWordHash: { type: String, required: true },
    timeZone: { type: String },
    switchPoints: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SwitchPoint',
      },
    ],
  },
  { collection: 'users', timestamps: true },
);

// delete passwordHash before sending user object
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret.passWordHash;
  },
});

export const User = model<IUser>('User', userSchema);
