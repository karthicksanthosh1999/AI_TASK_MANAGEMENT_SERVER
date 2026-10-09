import jwt, { SignOptions } from 'jsonwebtoken';

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
        const option:SignOptions = {
            expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "30m") as SignOptions["expiresIn"]
        } 
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, option);
    };
    static generateRefreshToken(payload: IJwtRefreshToken): string {
            const option:SignOptions = { 
                expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"] 
            }
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, option );
    };
    static verifyAccessToken(token: string): IJwtAccessToken {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as IJwtAccessToken;
    };
    static verifyRefreshToken(token: string): IJwtRefreshToken {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as IJwtRefreshToken;
    };
}