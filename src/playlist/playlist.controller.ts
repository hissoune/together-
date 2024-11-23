import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthMidllware } from 'src/guard/auth.gard';

@Controller('playlist')
@UseGuards(AuthMidllware)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create( @Request() req, @Body() createPlaylistDto: CreatePlaylistDto) {
    const ownerId = req.user?.id;
    createPlaylistDto.owner = ownerId;
    
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll( @Request() req) {
    const ownerId = req.user?.id;

    return this.playlistService.findAll(ownerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const ownerId = req.user?.id;

    return this.playlistService.findOne(id,ownerId);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Request() req, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const ownerId = req.user?.id;

    return this.playlistService.update(id,ownerId, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
