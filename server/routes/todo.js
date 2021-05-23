import express from "express";
import { getTodos, createTodo, editTodo, deleteTodo, deleteTodos } from "../controllers/todos";
const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', editTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteTodos);

export default router

