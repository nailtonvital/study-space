import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateMediaDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsString()
    readonly imageUrl: string;

    @ApiProperty({ type: [Number] })
    @IsArray()
    readonly interestIds: number[];

    @ApiProperty()
    @IsNumber()
    readonly userId: number;
}
