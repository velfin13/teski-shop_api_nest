import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'velkin',
    password: 'password',
    database: 'teski-shop',
    autoLoadEntities: true,
    synchronize: true,
  }), ProductsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
