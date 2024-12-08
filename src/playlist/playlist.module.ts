import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../users/entities/user.entity';
import { Playlist, playlistSchema } from './schemas/playlist.schema';

@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: Playlist.name, schema: playlistSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }])

],

  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
