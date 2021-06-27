import express from 'express';
import User from '../models/user';
import auth from '../middleware/auth';
import { signUp, login, deleteUsers, deleteUser, logout } from '../controllers/user'
const router = new express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', auth, logout);
router.delete('/delete', auth, deleteUser);
//router.delete('/', deleteUsers);

export default router;