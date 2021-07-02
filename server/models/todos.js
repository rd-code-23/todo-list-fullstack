import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    isComplete: {
        type: Boolean,
        default: false,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        ref: 'User'
    }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
