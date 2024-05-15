import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

interface CategoryInfo { // outside the controller class
    categoryId: string;
    productId: string;
  }

@Controller('categories')
export class CategoriesController {
    @Get(':categoryId') // here no longer 'categories' in @Get('categories/:categoryId') because the @Controller('categoryId') already is giving it to the route
    getOne(@Param() {categoryId}){ // other option: @Param('categoryId') categoryId: string
        return  {
            message: `product ${categoryId}`,
        };
    }

    @Get(':categoryId/products/:productId')
    getOneComplete(@Param('productId') productId: string, @Param('categoryId') categoryId: string){ // other option: @Param() { categoryId, productId }: CategoryInfo
        return {
            message: `Product ${productId}, Category ${categoryId}`,
        };
    }

    @Post()
    create(@Body() payload: any){ // other option: @Body() payload: CategoryInfo
        return {
            message: 'category created',
            payload,
        }
    }
}