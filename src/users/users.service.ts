import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
 async register(createUserDto: CreateUserDto) {

    const { name, email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {

      throw new ConflictException('Email is already in use');
    }

    const rgistredUser = new  this.userModel({name:name,email:email});

    rgistredUser.save();

    if (!rgistredUser) {

      throw new ConflictException("user couldnt register try again ");
    }
    try {
      const response = await axios.post('http://localhost:3002/auth/register',createUserDto );

      const createdUser = response.data;
      return createdUser;
  } catch (error) {
      await this.userModel.findByIdAndDelete(rgistredUser._id); 
      throw new Error('Registration failed');
  }



    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login(createUserDto: CreateUserDto){

  }
}
