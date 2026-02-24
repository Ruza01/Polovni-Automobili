import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { deleteCar, getCars } from '../../car/state/car.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-car-card',
    templateUrl: './car-card.component.html',
    styleUrls: ['./car-card.component.css'],
    standalone: false
})
export class CarCardComponent implements OnInit{

  showAdditionalContent: boolean = false;
  selectedCar: Car | null = null;
  cars$: Observable<Car[]>;
  images$: Observable<string[]>;

  constructor(private store: Store, private snackBar: MatSnackBar){
    this.cars$ = this.store.select(selectAllCars);
    this.images$ = this.store.select(selectAllImages);
  }

  toggleContent(car: Car){
    this.selectedCar = car;
    this.showAdditionalContent = true;
  }

  closeAdditionalContent(){
    this.selectedCar = null;
    this.showAdditionalContent = false;
  }

  ngOnInit(): void {
    this.store.dispatch(getCars());

    this.cars$.subscribe(cars => {
      console.log("Automobili:",cars);
      cars.forEach(car => {
        console.log(`Slike za auto ${car.id}:`, car.images);
      })
    })

    this.images$.subscribe(images => {
      console.log("Slike", images);
    })
  }

  onCloseViewMore(){
    this.showAdditionalContent = false;
  }

  deleteCar(car: Car){
    this.store.dispatch(deleteCar( {carId: car.id} ));

    this.snackBar.open('Uspešno ste obrisali oglas!', 'Zatvori', {
      duration: 7000,
    });
  }
}
