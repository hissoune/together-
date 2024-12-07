import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Injectable()
export class UsersService {
  private readonly authUrl: string;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,

  private configService: ConfigService,
) {
  this.authUrl = this.configService.get<string>('EXTERNAL_AUTH_URL');

}
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
      const response = await axios.post(`${this.authUrl}/register`,createUserDto );
 
   
      const createdUser = response.data;

      return createdUser;

  } catch (error) {
      await this.userModel.findByIdAndDelete(rgistredUser._id); 

      throw new UnauthorizedException('Registration failed');
  }

  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }

  async login(createUserDto: CreateUserDto){
    console.log('fuck');
    
    try {
      const response = await axios.post(`${this.authUrl}/login`,createUserDto );
          console.log(response);
          
      return { token: response.data.token };
  } catch (error) {
      throw new UnauthorizedException('Invalid credentials or authentication failed');
  }



  }
}
