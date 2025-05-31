import { Module, Search } from '@nestjs/common';
import { SampleModule } from '@/modules/sample/sample.module';
import { MotorbikeModule } from './modules/motorbike/motorbike.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WHEELIE_DB } from './common/constants';
import { User } from './entities/user.entity';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Vehicle } from './entities/vehicle.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './modules/auth/auth.module';
import { SearchModule } from './modules/search/search.module';
import { VehicleBrand } from './entities/vehiclebrand.entity';
import { VehicleModel } from './entities/vehiclemodel.entity';
import { VehicleImage } from './entities/vehicleimages.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_HOST || 'wheelie',
      password: process.env.PG_HOST || 'wheelie',
      database: WHEELIE_DB,
      schema: process.env.PG_HOST || 'wheelie',
      entities: [User, Vehicle, VehicleBrand, VehicleModel, VehicleImage],
      synchronize: false,
      extra: {
        trustServerCertificate: true,
      },
    }),
    AuthModule,
    MorganModule,
    SampleModule,
    MotorbikeModule,
    SearchModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
