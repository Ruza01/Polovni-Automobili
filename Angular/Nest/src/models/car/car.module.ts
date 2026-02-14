import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Car } from "./entities/car.entity";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import { carImages } from "./entities/carImages.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Car,carImages]), UserModule],
    providers: [CarService],
    exports: [CarService],
    controllers: [CarController]
})

export class CarModule{
    
}