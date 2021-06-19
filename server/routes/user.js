import express from 'express';
import User from '../models/user';
import auth from '../middleware/auth';
import { signUp, login, deleteUsers, logout } from '../controllers/user'
const router = new express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.post('/logout', auth, logout);
router.delete('/', deleteUsers);

export default router;