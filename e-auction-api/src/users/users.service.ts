import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userModel.create({
      userId: uuidv4(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      address: createUserDto.address,
      phone: createUserDto.phone,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async findAll(): Promise<CreateUserDto[]> {
    return this.userModel.find();
  }

  async findOne(userId: string): Promise<CreateUserDto> {
    return this.userModel.findOne({ userId });
  }

  async findByEmail(email: string): Promise<CreateUserDto> {
    return this.userModel.findOne({ email });
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto> {
    return this.userModel.findOneAndUpdate({ userId }, updateUserDto);
  }

  async remove(userId: string): Promise<CreateUserDto> {
    return this.userModel.findOneAndDelete({ userId });
  }
}
