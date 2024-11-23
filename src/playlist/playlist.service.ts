import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlist.name) private readonly playlistmodel:Model<PlaylistDocument>){}
  create(createPlaylistDto: CreatePlaylistDto) {

    
    const newplaylist = new  this.playlistmodel(createPlaylistDto)
    
    
    return newplaylist.save();
  }

  findAll(ownerId:string) {
    return this.playlistmodel.find({owner:ownerId});
  }

  findOne(id: string,ownerId:string) {
    return this.playlistmodel.findOne({_id:id,owner:ownerId});
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
