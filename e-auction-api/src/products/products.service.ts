import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create({
      productId: uuidv4(),
      name: createProductDto.name,
      description: createProductDto.description,
      detailDescription: createProductDto.detailDescription,
      category: createProductDto.category,
      startingPrice: createProductDto.startingPrice,
      bidEndDate: createProductDto.bidEndDate,
      sellerId: createProductDto.sellerId,
    });
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(productId: string): Promise<CreateProductDto> {
    return await this.productModel.findOne({ productId });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate(
      { productId: id },
      updateProductDto,
    );
  }

  async remove(id: string) {
    return this.productModel.findOneAndDelete({ productId: id });
  }
}
