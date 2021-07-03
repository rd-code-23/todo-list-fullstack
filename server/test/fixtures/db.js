import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../../models/user';

export const userOneId = new mongoose.Types.ObjectId()
export const userOne = {
    _id: userOneId,
    name: 'userOne',
    email: 'userOne@example.com',
    password: 'password1',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

export const userTwoId = new mongoose.Types.ObjectId()
export const userTwo = {
    _id: userTwoId,
    name: 'userTwo',
    email: 'userTwo@example.com',
    password: 'password2',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

export const setupDatabase = async () => {
    await User.deleteMany();
    // await Task.deleteMany()
    await new User(userOne).save();
    await new User(userTwo).save();
    // await new Task(taskOne).save()
    // await new Task(taskTwo).save()
    // await new Task(taskThree).save()
}