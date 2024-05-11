import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    try {
      return this.mediasService.create(createMediaDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.mediasService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mediasService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    try {
      return this.mediasService.update(+id, updateMediaDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.mediasService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
