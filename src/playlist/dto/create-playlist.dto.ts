import { ArrayMinSize, IsArray, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePlaylistDto {
    @IsDefined({ message: 'The playlist name is required.' })
    @IsNotEmpty()
    @IsString()
    name:string

    @IsDefined({ message: 'The playlist videos is required.' })
    @IsArray()
    @ArrayMinSize(1,{message:'a playlist must have at least one video'})
    @IsString({each:true})
    videos:string[]

    @IsOptional()
    @IsString()
    owner?:string

}
