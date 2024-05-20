import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({...createUserDto, password: hashedPassword});
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByEmail(email: string) : Promise<User> | undefined {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
    return user;
  }

  async findOneByUsername(username: string) : Promise<User> | undefined {
    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();
    return user;
  }

  async findOne(id: number) : Promise<User> | undefined{
    const user = this.userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .getOne();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
