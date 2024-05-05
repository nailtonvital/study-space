import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';
import { InterestsModule } from './interests/interests.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'study-space',
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        debug: true,
      })
    }),
    UsersModule, PostsModule, MediasModule, InterestsModule, PostCommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
