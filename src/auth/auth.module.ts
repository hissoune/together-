import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../users/entities/user.entity';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:userSchema}]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
