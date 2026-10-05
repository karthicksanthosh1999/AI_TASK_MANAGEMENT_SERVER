import { prisma } from "../../db/prisma";
import { UserEntity } from "../users/user.entity";
import { OtpDTO } from "./dto/auth.login.dto";

export class AuthRepository {
    async login(email: string):Promise<UserEntity | null>{
        const user = await prisma.user.findUnique( { where: { email } });

        if(!user) return null;

        return new UserEntity(user);
    };

    async forgetPassword(userId: string, otpHash: string, expiresAt: Date): Promise<void> {
        await prisma.passwordResetOtp.create({ data : {
            userId,
            otpHash,
            expiresAt
     } })
    };

    async validateOtp(userId: string): Promise<OtpDTO | null> {
        const validOtp =  await prisma.passwordResetOtp.findFirst({ 
            where: { 
                userId,  verifiedAt: null 
            }, 
            orderBy: { 
                createdAt: "desc"
            }
        });
        return validOtp;
    };

    async incrementOtpAttempt(id: string):Promise<void> {
        await prisma.passwordResetOtp.update({ 
            where: { id: id }, 
            data: { attempts: { increment: 1 } } 
        })
    };

    async markOtpVerified(id: string): Promise<void> {
        await prisma.passwordResetOtp.update({
            where: {
                id
            },
            data: {
                verifiedAt: new Date()
            }
        })
    };

    async updatePassword(userId: string, password: string): Promise<UserEntity> {
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password
            }
        });
        
    }
};