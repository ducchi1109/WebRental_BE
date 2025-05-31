import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Sửa phương thức findById
  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { _id: id } });
    return user ?? undefined; // Trả về `undefined` thay vì `null`
  }

  // Sửa phương thức findByEmail
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ?? undefined; // Trả về `undefined` thay vì `null`
  }

  async create(createUserDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ _id: id });
  }
}
