import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../players/models/player.model';

import { ICreateCategoryDTO } from './dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from './dtos/IUpdateCategoryDTO';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<Category>,
    @InjectModel('Player')
    private playerModel: Model<Player>,
  ) {}

  public async show(amount: number, page: number): Promise<Category[]> {
    const categories = this.categoryModel
      .find()
      .populate('players')
      .skip((page - 1) * amount)
      .limit(amount);
    return categories;
  }

  public async index(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).populate('players');

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

  async setPlayerInCategory(
    id_category: string,
    id_player: string,
  ): Promise<Category> {
    let category = await this.categoryModel.findById(id_category);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const player_already_exist = await this.playerModel.findById(id_player);

    if (!player_already_exist) {
      throw new NotFoundException('Player not found');
    }

    const player_already_exist_in_category = await this.categoryModel
      .findById(id_category)
      .where('players')
      .in([id_player]);

    if (player_already_exist_in_category) {
      throw new BadRequestException('Player already exists in category');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    category.players.push(id_player);

    category = await this.categoryModel.findByIdAndUpdate(
      {
        _id: category.id,
      },
      {
        $set: category,
      },
      {
        new: true,
      },
    );

    return category;
  }
}
