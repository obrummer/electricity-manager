import express from 'express';
const userRouter = express.Router();
import bcrypt from 'bcrypt';
import { User } from '../models/user';

interface ICreateUser {
  email: string;
  password: string;
  username: string;
  timeZone: string;
}

// get all users
userRouter.get('/users', async (_req, res, next) => {
  try {
    const users = await User.find({}).populate('switchPoints');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// create user
userRouter.post('/users', async (req, res, next) => {
  try {
    const { username, email, password, timeZone } = req.body as ICreateUser;
    const passWordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      passWordHash,
      timeZone,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
