import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    // encrypting the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    //using spread operator to take every properties
    const newUser = new User({ ...req.body, password: hash });
    //saving a new details in mongoDB
    await newUser.save();
    res.status(200).send('user has been created');
  } catch (err) {
    next(err);
  }
};
export const signin = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found'));

    //comparing a password to check if it exists or correct
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, 'Wrong credentials'));
    // creating my token
    // take our id from mongo and create Htoken and send it to user after login
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    next(err);
  }
};
