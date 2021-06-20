import express from "express";
import { getTodos, createTodo, editTodo, deleteTodo, deleteTodos } from "../controllers/todos";
import auth from '../middleware/auth';
const router = express.Router();

router.get('/', auth, getTodos);
router.post('/', auth, createTodo);
router.patch('/:id', auth, editTodo);
router.delete('/:id', auth, deleteTodo);
router.delete('/', auth, deleteTodos);

export default router

