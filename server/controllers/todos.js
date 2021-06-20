import express from "express";
import mongoose from "mongoose";
import Todo from "../models/todos";
const router = new express.Router();

export const getTodos = async (req, res) => {
    try {
        await req.user.populate({
            path: 'todos',
        }).execPopulate();
        res.send(req.user.todos)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

export const createTodo = async (req, res) => {
    const todo = new Todo({
        ...req.body,
        owner: req.user._id
    });

    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const editTodo = async (req, res) => {
    try {

        const updates = Object.keys(req.body) // gets properties
        console.log(updates);
        const allowedUpdates = ['text', 'completed'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if (!isValidOperation) {
            res.status(400).send();
        }

        const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });

        if (!todo) {
            return res.status(404).send();
        }

        updates.forEach(update => todo[update] = req.body[update]);
        await todo.save();
        res.send(todo)

    } catch (error) {
        res.status(500).send();
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!todo) {
            res.status(404).send();
        }

        res.send(todo);
    } catch (error) {
        res.status(500).send();
    }
}

export const deleteTodos = async (req, res) => {
    try {
        await Todo.deleteMany({ owner: req.user._id });
        res.send();
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export default router;