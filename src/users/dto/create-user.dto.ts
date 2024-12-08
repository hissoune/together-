import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsOptional()
    name?: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @IsOptional()
    gender?:string

    @IsString()
    @IsOptional()
    role?:string

    @IsString()
    @IsOptional()
    imagePath?:string
}
