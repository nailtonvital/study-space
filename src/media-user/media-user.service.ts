import { Injectable } from '@nestjs/common';
import { CreateMediaUserDto } from './dto/create-media-user.dto';
import { UpdateMediaUserDto } from './dto/update-media-user.dto';
import { MediaUser } from './entities/media-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaUserService {

  constructor(
    @InjectRepository(MediaUser)
    private mediaUserRepository: Repository<MediaUser>,
  ) { }

  async create(createMediaUserDto: CreateMediaUserDto) {
    try {
      return await this.mediaUserRepository.save(createMediaUserDto)
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.mediaUserRepository.find({
        relations: ['media', 'user']
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.mediaUserRepository.findOne({
        where: { idMediaUser: id },
        relations: ['media', 'user']
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateMediaUserDto: UpdateMediaUserDto) {
    try {
      return await this.mediaUserRepository.update(id, updateMediaUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.mediaUserRepository.delete({ idMediaUser: id });
    } catch (error) {
      throw error;
    }
  }
}
