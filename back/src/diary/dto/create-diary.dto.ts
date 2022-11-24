import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsNumber()
  friendId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  date: Date;
}
