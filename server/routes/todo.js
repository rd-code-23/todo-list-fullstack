const express = require('express');
const { getTodos, createTodo } = require('../controllers/todos')
const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);

module.exports = router

