import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaUserService } from './media-user.service';
import { CreateMediaUserDto } from './dto/create-media-user.dto';
import { UpdateMediaUserDto } from './dto/update-media-user.dto';

@Controller('media-user')
export class MediaUserController {
  constructor(private readonly mediaUserService: MediaUserService) { }

  @Post()
  create(@Body() createMediaUserDto: CreateMediaUserDto) {
    try {
      return this.mediaUserService.create(createMediaUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.mediaUserService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mediaUserService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaUserDto: UpdateMediaUserDto) {
    try {
      return this.mediaUserService.update(+id, updateMediaUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.mediaUserService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
