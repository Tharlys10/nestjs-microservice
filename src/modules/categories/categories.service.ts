import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICreateCategoryDTO } from './dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from './dtos/IUpdateCategoryDTO';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<Category>,
  ) {}

  public async show(amount: number, page: number): Promise<Category[]> {
    const categories = this.categoryModel
      .find()
      .skip((page - 1) * amount)
      .limit(amount);

    return categories;
  }

  public async index(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  public async create({
    name,
    description,
    events,
  }: ICreateCategoryDTO): Promise<Category> {
    const category_already_exists = await this.categoryModel.findOne({ name });

    if (category_already_exists) {
      throw new BadRequestException('Category already exists');
    }

    const category = await this.categoryModel.create({
      name,
      description,
      events,
    });

    return category;
  }

  public async update(
    id: string,
    { name, description, events }: IUpdateCategoryDTO,
  ): Promise<Category> {
    const category_already_exists = await this.categoryModel.findById(id);

    if (!category_already_exists) {
      throw new NotFoundException('Category not found');
    }

    const category_already_exists_by_name = await this.categoryModel.findOne({
      name,
    });

    if (category_already_exists_by_name) {
      throw new BadRequestException('Category already exists');
    }

    const category = await this.categoryModel.findByIdAndUpdate(
      {
        _id: category_already_exists.id,
      },
      {
        $set: { name, description, events },
      },
      {
        new: true,
      },
    );

    return category;
  }
}
