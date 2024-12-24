import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";


const api = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})

export class CarService {
    constructor(private httpClient: HttpClient){

    }

    addCar(carDto: AddCarDto){
        return this.httpClient.post(`${api}/car/addCar`, carDto);
    }

    getAllCars(){
        return this.httpClient.get<Car[]>(`${api}/car/getAllCars`);
    }

    getPhotosById(id: number){
        return this.httpClient.get(`${api}/car/getImage/${id}`);
    }

    getCars(): Observable<Car[]>{
        return this.httpClient.get<Car[]>(`${api}/car/getAllCars`);
    }

    deleteCar(carId: number): Observable<void>{
        return this.httpClient.delete<void>(`${api}/car/deleteCar/${carId}`);
    }

    getCarsByFilter(value: string, filterType: string) {
        const params = new HttpParams()
        .set('value',value)
        .set('filterType', filterType);
        return this.httpClient.get<Car[]>(`${api}/car/getCarsByFilter`, {params});
    }
      
    
}