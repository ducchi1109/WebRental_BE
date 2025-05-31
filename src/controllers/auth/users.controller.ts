import { Controller, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from '@/modules/auth/users.service';
import { User } from '@/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Lấy thông tin người dùng theo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Cập nhật thông tin người dùng
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Cập nhật thông tin người dùng
    Object.assign(user, updateUserDto);
    return this.usersService.save(user);
  }

  // Xóa người dùng theo ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.usersService.remove(id); // Thêm phương thức xóa trong UsersService
  }
}
