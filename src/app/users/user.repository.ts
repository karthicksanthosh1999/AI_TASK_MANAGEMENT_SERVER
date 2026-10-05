import { prisma } from "../../db/prisma";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";

export class UserRepository{
    
    async create(userDto : CreateUserDto):Promise<CreateUserDto>{
        return await prisma.user.create({ data : { name: userDto.name, email: userDto.email, password:userDto.password } });
    };

    async findAll():Promise<CreateUserDto[]>{
        return await prisma.user.findMany({ orderBy: { createdAt : 'desc' } });
    };

    async findByEmail(email: string):Promise<UserEntity | null>{
        return await prisma.user.findUnique({ where: { email } });
        
    };

    async findById(id: string):Promise<UserEntity | null>{
        return await prisma.user.findUnique({ where : { id }})
    };

    async update(id :string, user :UpdateUserDto) {
        return await prisma.user.update({ where: { id }, data: user})
    };

    async delete(id :string) {
        return await prisma.user.delete({ where: { id }})
    };
}