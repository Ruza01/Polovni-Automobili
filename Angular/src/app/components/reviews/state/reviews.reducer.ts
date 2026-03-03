import { createReducer, on } from "@ngrx/store";
import { createReviewSuccess, loadReviewsSuccess } from "./reviews.action";
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
  }))
);

export function CarReducerr(state: ReviewsState | undefined, action: any){
    return reviewsReducer(state,action);
}