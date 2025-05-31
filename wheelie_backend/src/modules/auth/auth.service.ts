import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterDto } from '@/controllers/auth/dto/register.dto';
import { LoginDto } from '@/controllers/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const { email, password, confirmPassword, fullName } = dto;

      if (!password || !confirmPassword) {
        throw new BadRequestException(
          'Password and confirm password are required',
        );
      }

      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await this.usersService.create({
        email,
        password: hashed,
        fullName,
        createdUser: '4895C447-AD42-40A7-916C-4CB40616359C',
        isVerified: false,
      });

      const token = this.jwtService.sign({ email }, { expiresIn: '1d' });
      const verifyUrl = `http://localhost:3000/auth/verify?token=${token}`;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
      });

      return {
        message:
          'Registration successful. Please check your email to verify your account.',
      };
    } catch (error) {
      console.error('Error in register method:', error);
      throw error; // Throw lại lỗi để có thể nhìn thấy thông báo chi tiết
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) throw new NotFoundException('User not found');

      user.isVerified = true;
      await this.usersService.save(user);

      return { message: 'Email verified successfully' };
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isVerified) throw new UnauthorizedException('Email not verified');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user._id });

    return { accessToken: token };
  }
}
