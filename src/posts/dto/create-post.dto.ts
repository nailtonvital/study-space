import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { CreateInterestDto } from '../../interests/dto/create-interest.dto';

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsString()
    readonly text: string;

    @ApiProperty()
    @IsString()
    readonly imageUrl: string;

    @ApiProperty()
    @IsNumber()
    readonly likesCount: number;

    @ApiProperty()
    @IsNumber()
    readonly commentsCount: number;

    @ApiProperty({ type: Date })
    readonly createdAt: Date;

    @ApiProperty({ type: Date })
    readonly updatedAt: Date;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsNumber({}, { each: true })
    readonly interestIds: CreateInterestDto[];
}
