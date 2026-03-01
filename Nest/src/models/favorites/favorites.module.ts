import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Car } from '../car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Car])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}
