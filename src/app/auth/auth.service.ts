import { ApiError } from "../../lib/ApiError";
import { EmailService } from "../../lib/email.service";
import { JWTService } from "../../lib/JWTService";
import { UserEntity } from "../users/user.entity";
import { UserRepository } from "../users/user.repository";
import { AuthRepository } from "./auth.repository";
import { LoginDTO } from "./dto/auth.login.dto";
import bcrypt from 'bcrypt';

export class AuthService{
    private readonly userRepository: UserRepository;
    private readonly authRepository: AuthRepository;
    private readonly emailService: EmailService;
    constructor(){
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository()
        this.emailService = new EmailService()
    };

    async login(user: LoginDTO):Promise<{ user: UserEntity, accessToken: string, refreshToken: string }> {
        const loginUser = await this.userRepository.findByEmail(user.email);

        if(!loginUser) throw new ApiError("Invalid Email Address", 401);
        
        const validPassword = await bcrypt.compare(user.password, loginUser.password);
        
        if(!validPassword) throw new ApiError("Invalid Password", 401);

        let accessToken = JWTService.generateAccessToken({ id: loginUser.id, email:loginUser.email, role: loginUser.role });
        let refreshToken = JWTService.generateRefreshToken({ id: loginUser.id });

        return { user: loginUser, accessToken, refreshToken }        
    };

    async me(id: string):Promise<UserEntity | null> {
        const user = await this.userRepository.findById(id);
        if(!user) throw new ApiError("User Not Found", 400);
        return new UserEntity(user);
    };

    async forgetPassword(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new ApiError("User Not Found", 400);
        
        const otp = Math.floor(100000 + Math.random() * 900000);

        const otpHash = await bcrypt.hash(String(otp), 10);

        const expireAt = new Date(Date.now() + 5 * 60 * 1000);

        await this.authRepository.forgetPassword(user.id, otpHash, expireAt);
        await this.emailService.sendPasswordResetOtp(user.email, String(otp));
        return new UserEntity(user);
    };

    async verifyOTP(email: string, otp: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new ApiError("User Not Found", 400);
        
        const otpRecord = await this.authRepository.validateOtp(user?.id);
        
        if(!otpRecord) throw new ApiError("OTP Not Found", 400);

        if( new Date() > otpRecord.expiresAt) throw new ApiError("OTP has expired", 400);

        if(otpRecord.attempts > 5) throw new ApiError("Maximum OTP attempts exceeded", 400);

        const isValid = await bcrypt.compare(otp, otpRecord.otpHash);

        if(!isValid){
            await this.authRepository.incrementOtpAttempt(otpRecord.id)
        }

        await this.authRepository.markOtpVerified(otpRecord.id)
    };

    async updatePassword(email: string, password: string): Promise<UserEntity> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new ApiError("User Not Found", 400);
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await this.authRepository.updatePassword(user?.id, hashedPassword);
        return updatedUser;
    };
}