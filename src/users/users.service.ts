import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from '../interests/entities/interest.entity';
import { parse } from 'path';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    private jwtService: JwtService,
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

  async findAll() {
    try {
      return await this.userRepository.find({
        relations: { interests: true },
      });
    } catch (error) {
      throw error;
    }
  }


  async findOne(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email: email },
        relations: ['interests'],
      })
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { idUser: id },
        relations: ['interests', 'posts'],
      });
    } catch (error) {
      throw error;
    }
  }

  async auth(email, password) {
    try {
      const emailItem = await this.userRepository.findOne({
        where: { email: email }
      })
      if (emailItem.password === password) {
        this.generateToken(emailItem);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }


  // async listPosts(id: number) {
  //   try {
  //     const user = await this.userRepository.findOne({
  //       where: { idUser: id },
  //       relations: ['posts'],
  //     });
  //     return user.posts;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  generateToken(user: User) {
    const payload = { email: user.email, sub: user.idUser };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
