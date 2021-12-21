import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Event } from '../models/category.model';

class IUpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ required: true })
  events: Event[];
}

export { IUpdateCategoryDTO };
