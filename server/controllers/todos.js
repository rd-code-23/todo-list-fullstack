import express from "express";
import mongoose from "mongoose";
import Todo from "../models/todos";
const router = new express.Router();

//get all todos
export const getTodos = async (req, res) => {
    console.log('getting todos');
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

export const createTodo = async (req, res) => {
    const todo = new Todo({
        ...req.body
    });

    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteTodos = async (req, res) => {
    try {
        await Todo.deleteMany();
        res.send();
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export default router;