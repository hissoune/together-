import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  hashPassword } from '../utils/password.util';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
 constructor(@InjectModel(User.name) private userModel: Model<User>,
          
){}

 async createUser(createUserDto: CreateUserDto) {


  const existUser = await this.userModel.findOne({email:createUserDto.email});

  if (existUser) {

    throw new UnauthorizedException('this email allredy exist ');
  }
    const hashedPassword = await hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
  
    const newUser =this.userModel.create(createUserDto);
  
    
    return newUser;
  }
 

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true})
  }
  removeUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
