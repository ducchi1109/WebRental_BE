import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './users.module';
import { AuthService } from './auth.service';
import { AuthController } from '@/controllers/auth/auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'wheele_secret', // secret key của JWT
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'nguyenthanhdat.bc2310@gmail.com', // Cấu hình với tài khoản email root
          pass: 'xgqn kjqy okoi jrzp',
        },
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
