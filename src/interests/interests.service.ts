import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) { }
  async create(createInterestDto: CreateInterestDto) {
    try {
      return await this.interestRepository.insert(createInterestDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.interestRepository.createQueryBuilder('interest')
        .leftJoinAndSelect('interest.users', 'user_interest')
        .leftJoinAndSelect('interest.medias', 'medias')
        .leftJoinAndSelect('interest.posts', 'post')
        .leftJoinAndSelect('post.user', 'user')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.interestRepository.findOne({
        where: { idInterest: id },
        relations: ['users', 'medias', 'posts']
      })
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    try {
      return await this.interestRepository.update(id, updateInterestDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.interestRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async addInterstMedia(id: number, idMedia: number) {
    try {
      return await this.interestRepository
        .createQueryBuilder()
        .relation(Interest, 'medias')
        .of(id)
        .add(idMedia);
    } catch (error) {
      throw error;
    }
  }
}
