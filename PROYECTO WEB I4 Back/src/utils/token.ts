import jwt from 'jsonwebtoken';

const ACCESS_SECRET = 'secret1234utd';

export const generateAccessToken = (payload: { userId: string, username: string, role: string }) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

