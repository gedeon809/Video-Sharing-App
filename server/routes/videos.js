import express from 'express';
import { addVideo, addView, random, sub, trend } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();
//create a video
router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, addVideo);
router.delete('/:id', verifyToken, addVideo);
router.get('/find/:id', addVideo);
router.put('/view/:id', addView);
router.get('/trend', random);
router.get('/random', trend);
router.get('/sub', verifyToken, sub);
export default router;