import { Injectable } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostComment } from './entities/post-comment.entity';

@Injectable()
export class PostCommentsService {

  constructor(
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
  ) { }

  create(createPostCommentDto: CreatePostCommentDto) {
    try {
      return this.postCommentRepository.save(createPostCommentDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.postCommentRepository.find({
        relations: ['user', 'post']
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.postCommentRepository.findOne({
        where: { idPostComment: id },
        relations: ['user', 'post']
      })
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    try {
      return this.postCommentRepository.update(id, updatePostCommentDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.postCommentRepository.delete({ idPostComment: id });
    } catch (error) {
      throw error;
    }
  }
}
