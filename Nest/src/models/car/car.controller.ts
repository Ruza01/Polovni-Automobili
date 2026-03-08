import { Controller, Post, Get, Param, ParseIntPipe, Res, Patch, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { carDto } from './DTOs/car.dto';
import { Roles } from '../auth/decorators/role-decorator';
import { Role } from '../auth/enums/role-enum';
import { RolesGuard } from '../auth/guards/roles-guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('car')
export class CarController {

    constructor(private carService: CarService){
    }

    @Get('getAllCars')
    async getAllCars(){
        return this.carService.getAllCars();
    }

    @Post('addCar')
    @Roles(Role.ADMIN, Role.MEMBER)
    async addCar(@Body() carDto: carDto){
        return this.carService.addCar(carDto);
    }

    @Roles(Role.ADMIN)
    @Delete('deleteCar/:id')
    async deleteCar(@Param('id', ParseIntPipe) id: number ){
        return this.carService.deleteCar(id);
    }

    @Get('getCarsByFilter')
    async getCarsByFilter(@Query('value') value: string, @Query('filterType') filterType: string){
        return this.carService.getCarsByFilter(value,filterType);
    }


}
