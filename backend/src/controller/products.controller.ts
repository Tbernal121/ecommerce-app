import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode } from '@nestjs/common';
import internal from 'stream';
import {ProductsService} from './../services/products.service'
import {Product} from './../entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private productsService : ProductsService){}

    @Get('all-products')   
    getAll(){
        return this.productsService.findAll();
    }

    @Get(':id') // here no longer 'products' in @Get('products/:id') because the @Controller('products') already is giving it to the route
    getOne(@Param('id') id: string){ // other option @Param() {id}: ProductInfo
        /*return {
            message: `product ${id}`,
        };*/
        return this.productsService.findOne(+id); // here I'm converting id to a number
    }

    /*@Get()
    getFilter(@Query('price') price = 100, @Query('id') id = 20, @Query('brand') brand: string){ //  other option: @Query() { price, id }: ProductInfo
        return {
            message: `products: price: ${price} id: ${id} brand ${brand}`,
        }; 
    }*/

    @Post()
    create(@Body() payload: any){ // other option: @Body() payload: ProductInfo
        /*return {
            message: 'product created',
            payload,
        };*/
        return this.productsService.create(payload)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any){
        /*return {
            id,
            payload,
        };*/
        return this.productsService.update(+id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.productsService.delete(+id)
    }
}