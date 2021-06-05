import express from 'express';
import User from '../models/user';
const router = new express.Router();

export const signUp = async (req, res) => {
    try {
        const user = new User(req.body);

        const duplicateEmail = await User.findOne({ email: user.email });
        if (duplicateEmail) {
            console.log('duplicate email');
            return res.status(400).send({ message: "User already exists" })
        }

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.send();
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export default router;