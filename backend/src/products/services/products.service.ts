import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { faker } from '@faker-js/faker';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      // mini example DB, in a real app this should be with a real DB
      id: 1,
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int(),
      brand: faker.company.name(),
      image: faker.image.imageUrl(),
      category: faker.commerce.department(),
      tags: [
        faker.commerce.productAdjective(),
        faker.commerce.productMaterial(),
      ],
      discount: faker.number.int({ min: 0, max: 50 }),
      rating: parseFloat(faker.finance.amount(0, 5, 1)),
      reviews: Array(faker.number.int({ min: 0, max: 5 }))
        .fill(null)
        .map(() => faker.lorem.sentence()),
      weight: parseFloat(faker.finance.amount()),
      height: parseFloat(faker.finance.amount()),
      width: parseFloat(faker.finance.amount()),
      depth: parseFloat(faker.finance.amount()),
      manufacturer: faker.company.name(),
      dateAdded: faker.date.past(),
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: ++this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
      id: id, // To prevent the user from entering the ID in the body
    };
    return {
      Message: 'Product updated',
      Updated: this.products[index],
    };
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    this.products.splice(index, 1);
    return `product ${id} deleted`;
  }
}
