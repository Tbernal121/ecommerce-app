import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { faker } from '@faker-js/faker';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
    private counterId = 1;
    private categories: Category[] = [ { // mini example DB, in a real app this should be with a real DB
        id: 1,
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),        
    },];

    findAll() {
        return this.categories;
    }

    findOne(id: number) {
        const categorie = this.categories.find(item=>item.id === id);
        if(!categorie){
            throw new NotFoundException(`Categorie with id #${id} not found`);
        }
        return categorie;
    }

    create(payload: CreateCategoryDto) {
        const newProduct = {
            id: ++this.counterId,
            ...payload,
        };
        this.categories.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: UpdateCategoryDto) {
        const categorie = this.findOne(id);     
        const index = this.categories.findIndex((item) => item.id === id);
        this.categories[index] = {            
            ...categorie,
            ...payload,
            id: id, // To prevent the user from entering the ID in the body
        };
        return {
            Message: 'Categorie updated',
            Updated: this.categories[index],
            };      
    }

    delete(id: number) {        
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Categorie with id #${id} not found`);
        }
        this.categories.splice(index, 1);
        return `Categorie ${id} deleted`;
    }
}