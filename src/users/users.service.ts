import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from '../interests/entities/interest.entity';
import { parse } from 'path';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);

      if (createUserDto.interests && createUserDto.interests.length > 0) {
        // Crie um array para armazenar os objetos de interesse
        const interests = [];
        // Para cada ID de interesse fornecido no DTO
        for (const interestId of createUserDto.interests) {
          // Encontre o interesse no banco de dados
          const interest = await this.interestRepository.createQueryBuilder('interest')
            .where('interest.idInterest = :id', { id: interestId })
            .getOne();
          // Se encontrou o interesse, adicione-o ao array
          if (interest) {
            interests.push(interest);
          }
        }
        // Associe os interesses encontrados ao usuário
        user.interests = interests;
      }
      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.userRepository.find({
        relations: { interests: true },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.interests', 'interest')
        .where('user.idUser = :id', { id })
        .getOne()
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
