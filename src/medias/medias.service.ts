import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { InterestsService } from 'src/interests/interests.service';
import { Interest } from 'src/interests/entities/interest.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private userRepository: UsersService,
    private interestService: InterestsService
  ) { }
  async create(createMediaDto: CreateMediaDto) {
    try {
      const interests = [];
      let user = null;
      if (createMediaDto.userId) {
        user = await this.userRepository.findOneById(createMediaDto.userId);
      }
      if (createMediaDto.interestIds && createMediaDto.interestIds.length > 0) {

        for (const interestId of createMediaDto.interestIds) {
          const interestItem = await this.interestService.findOne(interestId);

          if (interestItem) {
            interests.push(interestItem);
          }
        }
      }

      return this.mediaRepository.save({ ...createMediaDto, interests });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {

      return this.mediaRepository.find({
        relations: ['interests', 'users'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.mediaRepository.findOne({
        where: { idMedia: id },
        relations: ['interests', 'users'],
      })
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      return await this.mediaRepository.update(id, updateMediaDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.mediaRepository.delete({ idMedia: id });
    } catch (error) {
      throw error;
    }
  }
}
