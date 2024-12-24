import { Controller, Post, Get, UseInterceptors, UploadedFiles, Param, ParseIntPipe, Res, Patch, Body, Delete, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { carDto } from './DTOs/car.dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService){
    }

    @Get('getAllCars')
    async getAllCars(){
        return this.carService.getAllCars();
    }

    @Post('addCar')
    async addCar(@Body() carDto: carDto){
        return this.carService.addCar(carDto);
    }

    @Delete('deleteCar/:id')
    async deleteCar(@Param('id', ParseIntPipe) id: number ){
        return this.carService.deleteCar(id);
    }

    @Get('getCarsByFilter')
    async getCarsByFilter(@Query('value') value: string, @Query('filterType') filterType: string){
        return this.carService.getCarsByFilter(value,filterType);
    }


}
