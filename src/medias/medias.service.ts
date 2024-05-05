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
      return this.mediaRepository.insert(createMediaDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.mediaRepository.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.mediaRepository.createQueryBuilder('media')
        .where('media.idMedia = :id', { id })
        .getOne();
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
      return this.mediaRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
