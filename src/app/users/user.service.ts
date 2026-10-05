import { ApiError } from "../../lib/ApiError";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";
import bcrypt from 'bcrypt';

export class UserService{
    private readonly userRepository: UserRepository;

    constructor(){
         this.userRepository = new UserRepository();
    };

    async createUser(user:CreateUserDto): Promise<CreateUserDto>{

        let existingUser = await this.userRepository.findByEmail(user.email);
        if(existingUser) throw new ApiError("User Already Exist", 400);
        let hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = await this.userRepository.create({...user, password: hashedPassword});
        
        return createdUser
    };

    async getAllUsers(): Promise<CreateUserDto[]>{
        const users =  await this.userRepository.findAll();
        return users
    };

    async findByEmail(email: string): Promise<CreateUserDto>{

        let user = await this.userRepository.findByEmail(email);
        if(!user) throw new ApiError("User Not Found", 400);

        return user;
    };
    
    async findById(id: string):Promise<CreateUserDto> {
        let user = await this.userRepository.findById(id);
        if(!user) throw new ApiError("User Not Found", 400);
        
        return user;    
    };
    
    async delete(id: string):Promise<CreateUserDto> {
        let user = await this.userRepository.delete(id);
        if(!user) throw new ApiError("User Not Found", 400);

        return user;
    };

    async update(id: string, user:UpdateUserDto):Promise<CreateUserDto> {
          const updateData: UpdateUserDto = {...user};

        if (user.password) {
            updateData.password = await bcrypt.hash(user.password, 10);
        }
        const updatedUser = await this.userRepository.update(id,updateData);
        if (!updatedUser) throw new ApiError("User Not Found", 404);

        return updatedUser;
    }
}