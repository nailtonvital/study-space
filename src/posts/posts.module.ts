import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from '../post-comments/entities/post-comment.entity';
import { Interest } from '../interests/entities/interest.entity';
import { Media } from '../medias/entities/media.entity';
import { User } from '../users/entities/user.entity';
import { PostCommentsModule } from 'src/post-comments/post-comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Media, Interest, PostComment]), PostCommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
