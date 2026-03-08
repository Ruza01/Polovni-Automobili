import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class FavoritesService {

  constructor(@InjectRepository(Favorite) private favoriteRepo: Repository<Favorite>,
              @InjectRepository(Car) private carRepo: Repository<Car>){

  }

  async addToFavorites(userId: number, carId: number){
    const car = await this.carRepo.findOne( {where: { id: carId }} );

    const exists = await this.favoriteRepo.findOne({
      where: {
        user: { id: userId },
        car: { id: carId },
      }
    })

    if (exists){
      throw new BadRequestException("Already in favorites");
    }

    const favorite = this.favoriteRepo.create({
      user: { id: userId },
      car
    })

    return this.favoriteRepo.save(favorite);
  }

  async remove(userId: number, carId: number) {
    return this.favoriteRepo.delete({
      user: { id: userId },
      car: { id: carId }
    });
  }

  async getUserFavorites(userId: number){
    return this.favoriteRepo.find({
      where: { user: { id: userId} },
      relations: ['car', 'car.images']
    })
  }
}
