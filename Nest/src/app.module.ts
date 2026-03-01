import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { CarModule } from './models/car/car.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { FavoritesModule } from './models/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    CarModule,
    FavoritesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}