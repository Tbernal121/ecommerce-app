import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
