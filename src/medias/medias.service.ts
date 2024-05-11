import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) { }
  create(createMediaDto: CreateMediaDto) {
    try {
      return this.mediaRepository.save(createMediaDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.mediaRepository.find({
        relations: ['interests', 'users']
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.mediaRepository.findOne({
        where: { idMedia: id },
        relations: ['interests', 'users'],
      })
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      return this.mediaRepository.update(id, updateMediaDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.mediaRepository.delete({ idMedia: id });
    } catch (error) {
      throw error;
    }
  }
}
