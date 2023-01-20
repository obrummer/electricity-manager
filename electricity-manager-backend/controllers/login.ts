import express from 'express';
const loginRouter = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import { SECRET } from '../utils/config';

interface ILogin {
  username: string;
  password: string;
}

interface IUserWithId extends IUser {
  _id: string;
}

// create user
loginRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body as ILogin;

    const user = (await User.findOne({ username })) as IUserWithId;
    console.log('user', user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passWordHash);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jwt.sign(userForToken, SECRET!);

    res.status(200).send({ token, username: user.username });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
