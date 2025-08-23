import express from 'express';
import { register, login, me } from '../conroller/authController.js';
import { auth } from '../middleware/isAuthenticated.js';


const router = express.Router();


router.post('/signup', register);
router.post('/login', login);
router.get('/me', auth, me);


export default router;