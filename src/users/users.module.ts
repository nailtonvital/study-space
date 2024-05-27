import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from '../interests/entities/interest.entity';
import { Post } from '../posts/entities/post.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Interest, Post]), JwtModule.register({
    secret: 'yourSecretKey', // Use a strong secret key in production
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
