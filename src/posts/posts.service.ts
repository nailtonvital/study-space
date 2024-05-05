import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Interest } from '../interests/entities/interest.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto) {
    try {
      const post = this.postRepository.create(createPostDto);

      if (createPostDto.interestIds && createPostDto.interestIds.length > 0) {
        const interests = [];

        for (const interestId of createPostDto.interestIds) {
          const interestItem = await this.interestRepository
            .createQueryBuilder('interest')
            .where('interest.idInterest = :id', { id: interestId })
            .getOne();

          if (interestItem) {
            interests.push(interestItem);
          }
        }

        post.interests = interests;
      }

      if (createPostDto.userId) {
        const userEn = await this.userRepository
          .createQueryBuilder('user')
          .where('user.idUser = :id', { id: createPostDto.userId })
          .getOne();

        post.user = userEn;
      }

      return this.postRepository.save(post);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.postRepository.find({
        relations:{
          interests: true,
          user: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.postRepository.createQueryBuilder('post')
        .where('post.idPost = :id', { id })
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return this.postRepository.update(id, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.postRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
