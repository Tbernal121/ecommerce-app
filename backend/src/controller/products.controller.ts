import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import internal from 'stream';
import {ProductsService} from './../services/products.service'
import {Product} from './../entities/product.entity';
import {PositiveIntegerPipe} from '../pipes/positive-integer.pipe';

@Controller('products')
export class ProductsController {
    constructor(private productsService : ProductsService){}

    @Get('all-products')   
    getAll(){
        return this.productsService.findAll();
    }

    @Get(':id') // here no longer 'products' in @Get('products/:id') because the @Controller('products') already is giving it to the route
    getOne(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number){ // the PositiveIntegerPipe would'n be reached
        return this.productsService.findOne(id);
    }

    @Get()
    getFilter( // In process
        @Query('price') price = 100, 
        @Query('id', ParseIntPipe) id = 20, 
        @Query('brand') brand: string
    ) {
        return {
            message: `products: price: ${price} id: ${id} brand ${brand}`,
        }; 
    }

    @Post()
    create(@Body() payload: any){
        return this.productsService.create(payload)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() payload: any){
        return this.productsService.update(+id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string){
        return this.productsService.delete(+id)
    }
}