import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
//conncting to mongoose
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('first connection');
    })
    .catch((err) => {
      throw err;
    });
};
app.use(cookieParser());
//allowing the app to take a json file from outside
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

//Handling errors with express
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`server is running on port: ${port}`);
});
