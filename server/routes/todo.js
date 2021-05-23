import express from "express";
import { getTodos, createTodo, deleteTodos } from "../controllers/todos";
const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/', deleteTodos);

export default router

