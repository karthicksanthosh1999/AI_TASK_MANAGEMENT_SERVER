export class LoginDTO {
    email: string;
    password: string;

    constructor(data: { email: string, password: string} ) {
        this.email = data.email;
        this.password = data.password
    }
}

export class OtpDTO {
    public id: string;
    public userId: string;
    public otpHash: string;
    public expiresAt: Date;
    public verifiedAt? : Date;
    public attempts: number;

    constructor( data: { id: string, userId: string, otpHash: string, expiresAt: Date, verifiedAt?: Date, attempts: number }){
        this.id = data.id;
        this.userId = data.userId;
        this.otpHash = data.otpHash;
        this.expiresAt = data.expiresAt;
        this.verifiedAt = data.verifiedAt;
        this.attempts = data.attempts
    }
}

export interface VerifyOtpDTO {
    email: string;
    otp: string;
}