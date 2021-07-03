import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../../models/user';
import Todo from '../../models/todos';

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
    _id: userOneId,
    name: 'userOne',
    email: 'userOne@example.com',
    password: 'password1',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

export const userTwoId = new mongoose.Types.ObjectId();
export const userTwo = {
    _id: userTwoId,
    name: 'userTwo',
    email: 'userTwo@example.com',
    password: 'password2',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

export const todoOne = {
    _id: new mongoose.Types.ObjectId(),
    text: 'todo 1',
    completed: false,
    owner: userOne._id
}

export const todoTwo = {
    _id: new mongoose.Types.ObjectId(),
    text: 'todo 2',
    completed: false,
    owner: userOne._id
}

export const todoThree = {
    _id: new mongoose.Types.ObjectId(),
    text: 'todo 3',
    completed: false,
    owner: userTwo._id
}

export const setupDatabase = async () => {
    await User.deleteMany();
    await Todo.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Todo(todoOne).save();
    await new Todo(todoTwo).save();
    await new Todo(todoThree).save();
}