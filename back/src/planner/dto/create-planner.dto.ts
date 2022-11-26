import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePlannerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  imgUrl: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  priority: number;
}