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

    console.log(createPlaylistDto);
    
    const newplaylist = new  this.playlistmodel(createPlaylistDto)
    console.log(newplaylist);
    
    
    return newplaylist.save();
  }

  findAll(ownerId:string) {

    
    return this.playlistmodel.find();
  }

  findOne(id: string,ownerId:string) {
    return this.playlistmodel.findOne({_id:id,owner:ownerId});
  }

  async update(id: string,ownerId:string, updatePlaylistDto: UpdatePlaylistDto) {

    const { videos, name } = updatePlaylistDto;
  
    const playlist = await this.playlistmodel.findOne({_id:id,owner:ownerId});
    if (!playlist) {
      throw new Error('Playlist not found');
    }
  
    const updatedVideos = [...new Set([...playlist.videos, ...videos])]; 
  
    const updateData: any = {};
  
    if (name) {
      updateData.name = name;
    }
  
    if (videos && videos.length > 0) {
      updateData.videos = updatedVideos;
    }
  
    return await this.playlistmodel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
  

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
