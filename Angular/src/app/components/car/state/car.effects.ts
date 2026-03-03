import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCar, addCarSucces, deleteCar, deleteCarSucces, getCars , getCarsByFilter, getCarsByFilterSuccess, getCarsSuccess } from "./car.action";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { CarService } from "../car.service";
import { Car } from "src/app/models/car.model";
import { AppState } from "src/app/store/app.state";

@Injectable()
export class CarEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private carService: CarService){
    }

    addCar$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCar),
            exhaustMap(action => this.carService.addCar(action.carDto).pipe(
                map((car: any) => { 
                    const imageUrls: any[] = action.carDto.images;
                    const carObj: Car = {
                        id: car.id,
                        stanje: car.stanje,
                        marka: car.marka,
                        model: car.model,
                        godiste: car.godiste,
                        kilometraza: car.kilometraza,
                        karoserija: car.karoserija,
                        gorivo: car.gorivo,
                        kubikaza: car.kubikaza,
                        snagaMotora: car.snagaMotora,
                        cena: car.cena,
                        fiksnaCena: car.fiksnaCena,
                        zamena: car.zamena,
                        images: imageUrls,
                        user: car.user
                    }
                    return addCarSucces({ car: carObj })  
                }) 
            ))
        )
    })

    getCars$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCars),
          mergeMap(() => this.carService.getCars().pipe(   
              map((cars: Car[]) => getCarsSuccess({ cars })),
              catchError(() => of({ type: 'Get cars failed' })) 
            )
          )
        )
      );
      
      getCarsByFilter$ = createEffect(() =>
        this.actions$.pipe(
          ofType(getCarsByFilter),
          mergeMap( action => this.carService.getCarsByFilter(action.value, action.filterType).pipe(   
              map((cars: Car[]) => getCarsByFilterSuccess({ cars })), 
              catchError(() => of({ type: 'Get cars failed' })) 
            )
          )
        )
      );

      deleteCar$ = createEffect(() => 
        this.actions$.pipe(
          ofType(deleteCar),
          mergeMap(action => 
            this.carService.deleteCar(action.carId).pipe(
              map(() => deleteCarSucces({ carId: action.carId }))
            )
          )
        )
      )
}