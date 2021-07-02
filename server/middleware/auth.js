import jwt from 'jsonwebtoken';
import User from '../models/user';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        // Check if this is a google login or not
        // A token of length >= 500 is a google login
        const isGoogleLogin = token.length >= 500;
        let user = null;

        if (isGoogleLogin) {
            const decoded = jwt.decode(token);
            user = { _id: decoded?.sub };
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        }

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export default auth;