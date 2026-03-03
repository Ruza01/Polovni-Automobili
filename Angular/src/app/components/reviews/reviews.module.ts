import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReviewsEffect } from './state/reviews.effects';
import { reviewsReducer } from './state/reviews.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('reviews', reviewsReducer), 
    EffectsModule.forFeature([ReviewsEffect])
  ]
})
export class ReviewsModule { }
