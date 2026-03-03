import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Review } from 'src/app/models/Interfaces/reviews-interface';

const api = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient: HttpClient){
  }

  getReviews(userId: number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(`${api}/reviews/user/${userId}`);
  }

  createReview(reviewedUserId: number, rating: number, comment?: string) {
    return this.httpClient.post<Review>(`${api}/reviews`, { reviewedUserId, rating, comment }).pipe(
      catchError(err => {
        return throwError(() => err); 
      })
    );
  }
}
