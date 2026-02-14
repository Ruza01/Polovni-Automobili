import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Like, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { carDto } from "./DTOs/car.dto";
import { carImages } from "./entities/carImages.entity";


@Injectable()
export class CarService {

    constructor(@InjectRepository(Car) private carRepository: Repository<Car>,
    private userService: UserService, @InjectRepository(carImages) private carImagesRepository: Repository<carImages>, @InjectRepository(carImages)
    private imgRepository: Repository<carImages>){
    }

    async getCarById(id: number){
        return Car.findOneBy({id});
    }

    async getAllCars(){
        return Car.find({ relations: ['user', 'images'], select: {
            user:{
                username: true
            },
            images: {
                id: true,
                imagePath: true,
                
            }
        }});
        
    }

    async deleteCar(id: number) {
          const car = await this.carRepository.findOne({ where: { id } });    
          
          await this.imgRepository.delete(id);
    
          
          const result = await this.carRepository.delete(id);
          return result;
      }
 
    async addCar(carDto: carDto){
        try{
            const user = await this.userService.getUserById(carDto.userId); 
            if(user == null){
                throw new BadRequestException('user not found');
            }
            
            let car = new Car();
            car.stanje = carDto.stanje;
            car.marka = carDto.marka;
            car.model = carDto.model;
            car.godiste = carDto.godiste;
            car.kilometraza = carDto.kilometraza;
            car.karoserija = carDto.karoserija;
            car.gorivo = carDto.gorivo;
            car.kubikaza = carDto.kubikaza;
            car.snagaMotora = carDto.snagaMotora;
            car.cena = carDto.cena;
            car.fiksnaCena = carDto.fiksnaCena;
            car.zamena = carDto.zamena;
            car.user = user;
            
            const savedCar = await this.carRepository.save(car);

        
            for (const imagePath of carDto.images) {
                const carImage = new carImages();
                carImage.imagePath = imagePath;
                carImage.cars = savedCar;
                await this.carImagesRepository.save(carImage);
              }
            
      
            return savedCar;

        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async getCarsByFilter(value: string, filterType: string){
        const whereCondition = this.buildWhereCondition(value,filterType);

        return Car.find({ 
            relations: ['user', 'images'], 
            select: {
            user:{
                username: true
            },
            images: {
                id: true,
                imagePath: true,
            }
            }, where: whereCondition,

        });
    }

  private buildWhereCondition(value: string, filterType: string) {
    let whereCondition = {};
    
    switch (filterType) {
      case 'marka':
        whereCondition = { marka: value }; 
        break;
      case 'karoserija':
        whereCondition = { karoserija: value }; 
        break;
      case 'godiste':
        whereCondition = { godiste: value }; 
        break;
      case 'gorivo':
        whereCondition = { gorivo: value }; 
        break;
      case 'kubikaza':
        whereCondition = { kubikaza: value }; 
        break;
      case 'snagaMotora':
        whereCondition = { snagaMotora: value }; 
        break;
      default:
        whereCondition = {}; 
    }

    return whereCondition;
  }

    
}