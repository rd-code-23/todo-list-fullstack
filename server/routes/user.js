import express from 'express';
import User from '../models/user';
import { signUp, login, deleteUsers } from '../controllers/user'
const router = new express.Router();

router.post('/signup', signUp);
router.get('/login', login);
router.delete('/', deleteUsers);

export default router;