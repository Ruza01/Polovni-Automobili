import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { deleteCar, getCars } from '../../car/state/car.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUserRole, hasRole } from '../../user-auth/state/auth.selector';
import { addFavorite } from '../../favorites/state/favorites.action';

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
  isAdmin$!: Observable<boolean>;
  allowedToFavorite$!: Observable<boolean>

  constructor(private store: Store, private snackBar: MatSnackBar){
    this.cars$ = this.store.select(selectAllCars);
    this.images$ = this.store.select(selectAllImages);

    this.allowedToFavorite$ = this.store.select(getUserRole).pipe(
    map(role => role === 'ADMIN' || role === 'MEMBER')
  );
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
    this.isAdmin$ = this.store.select(hasRole('ADMIN'));
  }

  onCloseViewMore(){
    this.showAdditionalContent = false;
  }

  deleteCar(car: Car){
    const confirmed = window.confirm("Da li ste sigurni da zelite da se izlogujete?");

    if (confirmed){
      this.store.dispatch(deleteCar( {carId: car.id} ));

        this.snackBar.open('Uspešno ste obrisali oglas!', 'Zatvori', {
        duration: 7000,
      });
    }
  }

  addToFavorites(carId: number) {
    this.store.dispatch(addFavorite({ carId }))
  }
}
