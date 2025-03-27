import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        
        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  
        );

        return res.status(200).json({ newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};
