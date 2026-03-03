import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Favorites } from 'src/app/models/Interfaces/favorites-interface';

const api = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  constructor(private httpClient: HttpClient){
  }

  getFavorites(): Observable<Favorites[]>{
    return this.httpClient.get<Favorites[]>(`${api}/favorites/getUserFavorites`);
  }

  addToFavorites(carId: number): Observable<Favorites> {
    return this.httpClient.post<Favorites>(`${api}/favorites`, { carId }).pipe(
      catchError(err => {
        return throwError(() => err); 
      })
   );
  }

}
