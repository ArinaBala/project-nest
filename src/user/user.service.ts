import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.req.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { HashHelper } from '../helpers/hash.helper.js';
import { User } from './entities/user.entity.js';

@Injectable( )
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _repository: Repository<User>,
    private readonly _hashHelper: HashHelper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const existingUser = await this._repository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

 
    const hashedPassword = await this._hashHelper.hash(createUserDto.password);

    
    const newUser = this._repository.create({
      email: createUserDto.email,
      password_has: hashedPassword,
      fullname: createUserDto.fullname,
      is_block: createUserDto.is_block ?? false,
    });

    
    const savedUser = await this._repository.save(newUser);

    return {
      message: 'User successfully registered',
      userId: savedUser.id,
      email: savedUser.email,
    };
  }

  async findAll() {
    return await this._repository.find();
  }

  async findOne(id: number) {
    const user = await this._repository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this._repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this._repository.remove(user);
    return { message: `User with ID ${id} successfully deleted` };
  }
}