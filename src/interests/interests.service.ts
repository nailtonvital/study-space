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
    private plantRepository: Repository<Interest>,
  ) {}
  create(createInterestDto: CreateInterestDto) {
    return 'This action adds a new interest';
  }

  findAll() {
    return `This action returns all interests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interest`;
  }

  update(id: number, updateInterestDto: UpdateInterestDto) {
    return `This action updates a #${id} interest`;
  }

  remove(id: number) {
    return `This action removes a #${id} interest`;
  }
}
