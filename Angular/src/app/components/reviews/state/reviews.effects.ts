import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { ReviewsService } from "../reviews.service";
import { createReview, createReviewSuccess, loadReviews, loadReviewsSuccess } from "./reviews.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Review } from "src/app/models/Interfaces/reviews-interface";


@Injectable()
export class ReviewsEffect {

    constructor(private actions$: Actions, private store: Store<AppState>, private reviewsService: ReviewsService, private snackBar: MatSnackBar) {
    }

    loadReviews$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadReviews),
            switchMap(action =>
                this.reviewsService.getReviews(action.userId).pipe(
                    map((reviews: Review[]) => loadReviewsSuccess({ reviews }))
                )
            )
        )
    );

    createReview$ = createEffect(() =>
    this.actions$.pipe(
        ofType(createReview),
        switchMap(action =>
        this.reviewsService.createReview(action.reviewedUserId, action.rating, action.comment).pipe(
            tap(() => {
            // obaveštenje korisniku da je review poslat
            this.snackBar.open('Uspešno ste dodali recenziju!', 'Zatvori', { duration: 3000 });
            }),
            map((review: Review) => createReviewSuccess({ review })),
            catchError((error) => {
            // prikazi poruku o grešci
            const msg = error?.error?.message || 'Greška pri dodavanju recenzije';
            this.snackBar.open(msg, 'Zatvori', { duration: 5000 });

            // vrati prazan observable da efekat ne pukne
            return of();
            })
        )
        )
    )
    );

}