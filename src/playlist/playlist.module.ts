import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Playlist, playlistSchema } from './schemas/playlist.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Playlist.name, schema: playlistSchema }])],

  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
