import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'List of users',
    description: 'Retrieve a list of all users',
  })
  findAll(@Query('relations') relations?: string): Promise<User[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.userService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user by their ID',
  })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<User> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.userService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user by their ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete a user by their ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
