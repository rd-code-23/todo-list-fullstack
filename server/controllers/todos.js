const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/todos');
const router = new express.Router();

//get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

const createTodo = async (req, res) => {
    const todo = new Todo({
        ...req.body
    });

    try{
        await todo.save();
        res.status(201).send(todo);
    } catch(error){
        res.status(400).send(error)
    }
}

module.exports = { getTodos, createTodo }