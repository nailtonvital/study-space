import { Module } from '@nestjs/common';
import { MediaUserService } from './media-user.service';
import { MediaUserController } from './media-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaUser } from './entities/media-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaUser])],
  controllers: [MediaUserController],
  providers: [MediaUserService],
})
export class MediaUserModule { }
