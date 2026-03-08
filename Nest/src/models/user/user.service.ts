import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UserRegisterRequestDto } from "./DTOs/user-register.req.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService{
   
    constructor(@InjectRepository(User) private userRepository: Repository<User>){

    }

    async doUserRegistration(userRegister: UserRegisterRequestDto): Promise<User> {
        
        const salt = await bcrypt.genSalt(); 
        const password = await bcrypt.hash(userRegister.password, salt);

        const user = new User();
        user.name = userRegister.name;
        user.surname = userRegister.surname;
        user.username = userRegister.username;
        user.email = userRegister.email;
        user.password = password;

        return await user.save();

    }

    async getUserByEmail(email: string) {
        return User.findOne({ where: {email} });
    }

    async updateUser(id:number, user:User) {
        return User.update(id, user);
    }

    async deleteUser(id:number) {
        return User.delete(id);
    }

    async getUserById(id: number) {
        return User.findOneBy({ id });
    }

    async updateUserField(id: number, field: string, value: string) {
        const user = await User.findOne({ where: { id } });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        user[field] = value;
    
        return this.userRepository.save(user);
      }

    
}