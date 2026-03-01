import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { FavoritesService } from "../favorites.service";
import { addFavorite, addFavoriteSuccess, loadFavorites, loadFavoritesSuccess } from "./favorites.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Favorites } from "src/app/models/Interfaces/favorites-interface";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable()
export class FavoritesEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private favoritesService: FavoritesService, private snackBar: MatSnackBar) {
    }
    
    loadFavorites$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadFavorites),
            switchMap(() => 
                this.favoritesService.getFavorites().pipe(
                    map((favorites: Favorites[]) => 
                        loadFavoritesSuccess( {favorites} )
                    )
                )
            )
        )
    );

    addFavorites$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addFavorite),
            switchMap(action => 
                this.favoritesService.addToFavorites(action.carId).pipe(
                    tap(() => {
                        this.snackBar.open('Uspešno ste dodali u favorite!', 'Zatvori', { duration: 3000 });
                    }),
                    map((favorite: Favorites) => addFavoriteSuccess({ favorite })),
                     catchError((error) => {
                        const msg = error?.error?.message || 'Greška pri dodavanju u favorite';
                        this.snackBar.open(msg, 'Zatvori', { duration: 5000 });
                        return of(); // vrati prazan Observable da efekat ne pukne
                    })
                )
            )
        )
    )
    
}
