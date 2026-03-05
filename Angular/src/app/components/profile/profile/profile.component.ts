import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';
import { Observable, take } from 'rxjs';
import { getUser, getUserId, hasRole } from '../../user-auth/state/auth.selector';
import { User } from 'src/app/models/user.model';
import { Review } from 'src/app/models/Interfaces/reviews-interface';
import { ReviewsService } from '../../reviews/reviews.service';
import { loadAverageRating, loadReviews } from '../../reviews/state/reviews.action';
import { selectAverageRating, selectReviews } from '../../reviews/state/reviews.selector';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  showContent: boolean = false;
  user$!: Observable<User | null>;
  reviews$!: Observable<Review[]>;
  averageRating$!: Observable<number>;

  constructor(private carService: CarService, private store: Store<AppState>, private reviewsService: ReviewsService){
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);

  this.store.select(getUserId).pipe(take(1)).subscribe(userId => {
    this.store.dispatch(loadReviews({ userId }));
    this.store.dispatch(loadAverageRating({ userId }));
  });

    this.reviews$ = this.store.select(selectReviews);
    this.averageRating$ = this.store.select(selectAverageRating);
  }
  
  openForm() {
    this.showContent = true;
  }

  onFormClosed() {
    this.showContent = false;
  }

  isNotVisitor(user: User | null) {
    return user?.role !== 'VISITOR'
  }

}
