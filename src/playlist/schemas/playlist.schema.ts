import { Prop ,Schema} from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";



@Schema()
export class Playlist {
    @Prop({required:true})
    name:string

    @Prop({type: [{ type:String }]})
    videos:string[]

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User',required:true})
    owner:Types.ObjectId
}