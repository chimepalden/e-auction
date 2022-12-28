import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create({
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

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({});
  }

  async findOne(productId: string): Promise<Product> {
    return await this.productsRepository.findOne({ productId });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsRepository.findOneAndUpdate(
      { productId: id },
      updateProductDto,
    );
  }

  async remove(id: string): Promise<Product> {
    return this.productsRepository.findOneAndDelete({ productId: id });
  }
}
