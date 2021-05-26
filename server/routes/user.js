import express from 'express';
import User from '../models/user';
import { signUp, deleteUsers } from '../controllers/user'
const router = new express.Router();

router.post('/signup', signUp);
router.delete('/', deleteUsers);

export default router;