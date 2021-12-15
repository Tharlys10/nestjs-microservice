import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayersValidationParamsPagination } from 'src/shared/pipes/playersValidationParamsPagination.pipe';

import { CategoriesService } from './categories.service';
import { ICreateCategoryDTO } from './dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from './dtos/IUpdateCategoryDTO';
import { Category } from './models/category.model';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  public async show(
    @Query('amount', PlayersValidationParamsPagination) amount: number,
    @Query('page', PlayersValidationParamsPagination) page: number,
  ): Promise<Category[]> {
    const categories = await this.categoriesService.show(amount, page);

    return categories;
  }

  @Get('/:id')
  public async index(@Param('id') id: string): Promise<Category> {
    const categories = await this.categoriesService.index(id);

    return categories;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() { name, description, events }: ICreateCategoryDTO,
  ): Promise<Category> {
    const category = await this.categoriesService.create({
      name,
      description,
      events,
    });

    return category;
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  public async update(
    @Param('id') id: string,
    @Body() { name, description, events }: IUpdateCategoryDTO,
  ): Promise<Category> {
    const category = await this.categoriesService.update(id, {
      name,
      description,
      events,
    });

    return category;
  }

  @Post('/:id_category/player/:id_player')
  @UsePipes(ValidationPipe)
  public async setPlayerInCategory(
    @Param('id_category') id_category: string,
    @Param('id_player') id_player: string,
  ): Promise<Category> {
    const category = await this.categoriesService.setPlayerInCategory(
      id_category,
      id_player,
    );

    return category;
  }
}
