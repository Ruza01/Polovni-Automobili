import { createReducer, on } from "@ngrx/store";
import { createReviewSuccess, loadAverageRatingSuccess, loadReviewsSuccess } from "./reviews.action";
import { initialState, ReviewsState } from "./reviews.state";

export const reviewsReducer = createReducer(
  initialState,
  on(loadReviewsSuccess, (state, { reviews }) => ({
    ...state,
    reviews,
  })),
  on(createReviewSuccess, (state, { review }) => ({
    ...state,
    reviews: [review, ...state.reviews],
  })),
  on(loadAverageRatingSuccess, (state, { averageRating }) => ({
    ...state,
    averageRating
  }))
);

export function CarReducerr(state: ReviewsState | undefined, action: any){
    return reviewsReducer(state,action);
}