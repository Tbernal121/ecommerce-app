import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiRelationsQuery } from '../common/decorators/api-relations-query.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'List of users',
    description: 'Retrieve a list of all users',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: [User] })
  async findAll(@Query('relations') relations?: string): Promise<User[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.userService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user by their ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the user to retrieve',
    example: '781bd3cd-23a2-49e0-bb71-cc5c99f52c8c',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: User })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('relations') relations?: string,
  ): Promise<User> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.userService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user' })
  @ApiResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user by their ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the user to update',
    example: '781bd3cd-23a2-49e0-bb71-cc5c99f52c8c',
  })
  @ApiResponse({ status: 200, type: User })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete a user by their ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the user to delete',
    example: '781bd3cd-23a2-49e0-bb71-cc5c99f52c8c',
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}
