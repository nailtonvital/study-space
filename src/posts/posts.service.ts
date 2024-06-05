import { InterestsService } from './../interests/interests.service';
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
    @InjectRepository(Interest)
    private InterestsService: InterestsService

  ) { }

  async create(createPostDto: CreatePostDto) {
    try {
      // const post = await this.postRepository.create(createPostDto);

      const interests = [];
      let user = null;

      if (createPostDto.idUser) {
        user = await this.userRepository.findOne({
          where: { idUser: createPostDto.idUser }
        })
      }

      if (createPostDto.interestIds && createPostDto.interestIds.length > 0) {

        for (const interestId of createPostDto.interestIds) {
          const interestItem = await this.interestRepository
            .createQueryBuilder('interest')
            .where('interest.idInterest = :id', { id: interestId })
            .getOne();

          if (interestItem) {
            interests.push(interestItem);
          }
        }
      }

      return this.postRepository.save({ ...createPostDto, interests, user });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.interests', 'interests')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.likes', 'likes')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .leftJoinAndSelect('post.comments', 'post_comment')
        .leftJoinAndSelect('post_comment.user', 'comment_user')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.postRepository.createQueryBuilder('post')
        .where('post.idPost = :id', { id })
        .leftJoinAndSelect('post.interests', 'interests')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.likes', 'likes')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .leftJoinAndSelect('post.comments', 'post_comment')
        .leftJoinAndSelect('post_comment.user', 'comment_user')
        .getOne();

    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return await this.postRepository.update(id, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async addLike(id: number, userId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .add(userId);
    } catch (error) {
      throw error;
    }
  }

  async removeLike(id: number, userId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .remove(userId);
    } catch (error) {
      throw error;
    }
  }


  async listComments(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { idPost: id },
        relations: ['comments']
      });

      return post.comments;
    } catch (error) {
      throw error;
    }
  }

  async addComment(id: number, commentId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'comments')
        .of(id)
        .add(commentId);
    } catch (error) {
      throw error;
    }
  }

  async removeComment(id: number, commentId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'comments')
        .of(id)
        .remove(commentId);
    } catch (error) {
      throw error;
    }
  }

  async listInterests(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { idPost: id },
        relations: ['interests']
      });

      return post.interests;
    } catch (error) {
      throw error;
    }
  }

  async addInterest(id: number, interestId: number) {
    try {
      await this.postRepository
        .createQueryBuilder().insert().into('post_interest')
        .values({
          postId: id,
          interestId: interestId
        }).execute();

      return await this.postRepository.findOne({
        where: { idPost: id },
        relations: ['interests']
      });
    } catch (error) {
      throw error;
    }
  }

  // addUser(id: number, userId: number) {
  //   try {
  //     return this.postRepository
  //       .createQueryBuilder()
  //       .relation(Post, 'user')
  //       .of(id)
  //       .add(userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}
