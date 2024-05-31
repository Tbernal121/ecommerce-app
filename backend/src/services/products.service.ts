import { ConsoleLogger, Injectable } from '@nestjs/common';
import {Product} from './../entities/product.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsService {
    private counterId = 1;
    private products: Product[] = [{ // mini example DB, in a real app this should be with a real DB
        id: 1,
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int(),
        brand: faker.company.name(),
        image: faker.image.imageUrl(),
        category: faker.commerce.department(),
        tags: [faker.commerce.productAdjective(), faker.commerce.productMaterial()],
        discount: faker.number.int({ min: 0, max: 50 }),
        rating: parseFloat(faker.finance.amount(0, 5, 1)),
        reviews: Array(faker.number.int({ min: 0, max: 5 })).fill(null).map(() => faker.lorem.sentence()),
        weight: parseFloat(faker.finance.amount()),
        height: parseFloat(faker.finance.amount()),
        width: parseFloat(faker.finance.amount()),
        depth: parseFloat(faker.finance.amount()),
        manufacturer: faker.company.name(),
        dateAdded: faker.date.past()
    }];    

    findAll() {
        return this.products;
    }

    findOne(productId: number){
        return this.products.find(item=>item.id === productId);
    }

    create(payload: any){
        this.counterId++;
        const newProduct = {
            id: this.counterId,
            ...payload,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: any) {
        // option 1 - better
        const product = this.findOne(id);        
        if (product){
            const index = this.products.findIndex((item) => item.id === id);
            this.products[index] = {
            id: id,
            ...product,
            ...payload,
            };
            return {
                Message: 'Product updated',
                Updated: this.products[index],
              };
        }        
        else {
            throw new Error(`Product with id ${id} not found`);
            return null;
        }        
    }

    delete(id: number) {
        
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) throw new Error(`Product with id ${id} not found`);
        this.products.splice(index, 1);
        return `product ${id} deleted`;
    }
}