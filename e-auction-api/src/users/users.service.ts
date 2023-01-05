import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      address: createUserDto.address,
      phone: createUserDto.phone,
      email: createUserDto.email,
      password: createUserDto.password,
      products: [],
      badeProducts: [],
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async findOne(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, updateUserDto);
  }

  async remove(userId: string): Promise<User> {
    return this.usersRepository.findOneAndDelete({ userId });
  }
}
