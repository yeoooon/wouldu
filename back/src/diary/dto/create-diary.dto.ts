import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiaryDto {
  @ApiProperty()
  @IsNumber()
  friendId: number;

  @ApiProperty()
  @IsString()
  content: string;
}
