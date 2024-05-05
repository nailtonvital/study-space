import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDate, IsNumber, IsOptional } from 'class-validator';
import { CreateInterestDto } from 'src/interests/dto/create-interest.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly imageUrl: string;

    @ApiProperty()
    @IsString()
    readonly bio: string;

    @ApiProperty()
    @IsDate()
    readonly birthdate: Date;

    @ApiProperty({ type: Date })
    readonly createdAt: Date;

    @ApiProperty()
    @IsNumber()
    readonly idRole: number;

    @ApiProperty()
    @IsString()
    readonly gender: string;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsNumber({}, { each: true })
    readonly interests: CreateInterestDto[];

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsNumber({}, { each: true })
    readonly posts: CreatePostDto[];
}
