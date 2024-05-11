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
  create(createInterestDto: CreateInterestDto) {
    try {
      return this.interestRepository.insert(createInterestDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.interestRepository.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.interestRepository.findOne({
        where: { idInterest: id },
        relations: ['users', 'medias', 'posts']
      })
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateInterestDto: UpdateInterestDto) {
    try {
      return this.interestRepository.update(id, updateInterestDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.interestRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
