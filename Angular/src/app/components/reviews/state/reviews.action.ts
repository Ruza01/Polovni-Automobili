import { createAction, props } from "@ngrx/store";
import { Review } from "src/app/models/Interfaces/reviews-interface";

export const loadReviews = createAction('[Reviews] Load Reviews', props<{ userId: number }>());
export const loadReviewsSuccess = createAction('[Reviews] Load Reviews Success', props<{ reviews: Review[] }>());

export const createReview = createAction('[Reviews] Create Review', props<{ reviewedUserId: number; rating: number; comment?: string }>());
export const createReviewSuccess = createAction('[Reviews] Create Review Success', props<{ review: Review }>());

export const loadAverageRating = createAction('[Reviews] Load Average Rating', props<{ userId: number }>());
export const loadAverageRatingSuccess = createAction('[Reviews] Load Average Rating Success', props<{ averageRating: number }>());