import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { getCars } from '../../car/state/car.action';

@Component({
    selector: 'app-view-more',
    templateUrl: './view-more.component.html',
    styleUrls: ['./view-more.component.css'],
    standalone: false
})
export class ViewMoreComponent implements OnInit {
  
  cars$: Observable<Car[]>;
  kW: number = 200; //RSD

  @Input() car: Car | undefined;
  @Output() closeViewMore: EventEmitter<void> = new EventEmitter<void>(); 
  currentImageIndex: number = 0;
  registration: number = 0;
  kasko: number = 0;

  constructor(private store: Store){
    this.cars$ = this.store.select(selectAllCars);
  }
  
  stepBack1(){
    if (this.car && this.car.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.car.images.length) % this.car.images.length;
    }
  }

  stepForward1(){
    if(this.car && this.car.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.car.images.length;
    }
  }

  ngOnInit(): void {
    if(this.car){
      this.registration = this.calculateRegistration(this.car);
      this.kasko = this.calculateKasko(this.car);
    }
  }

  calculateRegistration(car: Car){
    const euroNorm = this.calculateEuroNorm(car);
    const registration = car.snagaMotora * this.kW + euroNorm ;
    return registration;
  }

  calculateEuroNorm(car: Car){
    let carNorm: number = 0;
    
    if(car.godiste < 1992){ // oldtimer
      carNorm = 50000;
    }else if(car.godiste < 1996 && car.godiste > 1992){ // euro 1
      carNorm = 40000;
    }else if(car.godiste < 2000 && car.godiste > 1996){ // euro 2
      carNorm = 35000;
    }else if(car.godiste < 2000 && car.godiste > 1996){ // euro 3
      carNorm = 30000;
    }else if(car.godiste < 2005 && car.godiste > 2000) { //euro 4
      carNorm = 25000;
    }else if(car.godiste < 2009 && car.godiste > 2005) { //euro 5
      carNorm = 20000;
    }else if(car.godiste > 2009 ) { // euro 6
      carNorm = 10000;
    }

    return carNorm;
  }

  calculateKasko(car: Car){
    let osiguranje: number = 0;
    let cascoDefault: number = 20000;
    if(car.stanje === "novo" || "Novo"){
      let carNorm = this.calculateEuroNorm(car);
      let novoStanje: number = 70000;
      if(carNorm == 50000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }else if(carNorm == 40000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }else if(carNorm == 30000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }else if(carNorm == 25000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }else if(carNorm == 20000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }else if(carNorm == 10000){
        osiguranje = carNorm + cascoDefault + novoStanje;
      }
    }else{
      let carNorm = this.calculateEuroNorm(car);
      let staroStanje: number = 30000;
      if(carNorm == 50000){
        osiguranje = carNorm + cascoDefault + staroStanje;
      }else if(carNorm == 40000){
        osiguranje = carNorm + cascoDefault + staroStanje;
      }else if(carNorm == 30000){
        osiguranje = carNorm + cascoDefault + staroStanje;
      }else if(carNorm == 25000){
        osiguranje = carNorm + cascoDefault + staroStanje;
      }else if(carNorm == 20000){
        osiguranje = carNorm + (cascoDefault + cascoDefault) + staroStanje;
      }else if(carNorm == 10000){
        osiguranje = carNorm + (cascoDefault + cascoDefault + cascoDefault) + staroStanje;
      }
    }
    return osiguranje;
  }
}
