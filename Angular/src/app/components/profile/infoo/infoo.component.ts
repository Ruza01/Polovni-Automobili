import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Favorites } from 'src/app/models/Interfaces/favorites-interface';
import { AppState } from 'src/app/store/app.state';
import { loadFavorites, removeFavorite } from '../../favorites/state/favorites.action';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../favorites/state/favorites.selector';

@Component({
    selector: 'app-infoo',
    templateUrl: './infoo.component.html',
    styleUrls: ['./infoo.component.css'],
    standalone: false
})
export class InfooComponent implements OnInit {

    favorites$!: Observable<Favorites[]>;

    constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.store.dispatch(loadFavorites());
        this.favorites$ = this.store.select(selectFavorites);
    }

    removeFavorite(carId: number) {
        this.store.dispatch(removeFavorite({ carId }));
        this.snackBar.open('Favorit je uklonjen!', 'Zatvori', { duration: 3000 });
    }

    

}
