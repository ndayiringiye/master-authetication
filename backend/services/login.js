import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const lognInService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return { status: 401, message: 'Invalid username or password' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { status: 401, message: 'Invalid username or password' };
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }  
        );

        user.refreshToken = refreshToken;
        await user.save();

        return { status: 200, accessToken, refreshToken, existedUser: user };
    } catch (error) {
        console.error('Login error:', error);
        return { status: 500, message: 'Login failed' };
    }
};
