import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Todo from './todos'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'owner'
})

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next()
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//remove important information from the response
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // Converts this document into a plain-old JavaScript object 
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

const User = mongoose.model('User', userSchema);

export default User;
