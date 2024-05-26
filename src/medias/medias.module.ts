import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from '../interests/entities/interest.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { InterestsModule } from '../interests/interests.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Media, User, Post, Interest]), InterestsModule, UsersModule],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule { }
