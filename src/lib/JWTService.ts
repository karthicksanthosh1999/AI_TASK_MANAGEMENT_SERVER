import jwt from 'jsonwebtoken';

interface IJwtAccessToken {
    id: string;
    role: string;
    email: string;
};

interface IJwtRefreshToken {
    id: string
};

export class JWTService{
    static generateAccessToken(payload: IJwtAccessToken):string {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" });
    };
    static generateRefreshToken(payload: IJwtRefreshToken): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"} );
    };
    static verifyAccessToken(token: string): IJwtAccessToken {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as IJwtAccessToken;
    };
    static verifyRefreshToken(token: string): IJwtRefreshToken {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as IJwtRefreshToken;
    };
}