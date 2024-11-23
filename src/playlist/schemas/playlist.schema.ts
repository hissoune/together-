import { Prop ,Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";



@Schema()
export class Playlist {
    @Prop({required:true})
    name:string

    @Prop({type: [{ type:String }]})
    videos:string[]

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User',required:true})
    owner:Types.ObjectId
}

export type PlaylistDocument = Playlist & Document;

export const playlistSchema = SchemaFactory.createForClass(Playlist)