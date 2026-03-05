import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReviewsState } from "./reviews.state";

export const REVIEW_STATE_NAME = 'reviews';

export const selectReviewState = createFeatureSelector<ReviewsState>(REVIEW_STATE_NAME);

export const selectReviews = createSelector(
  selectReviewState,
  (state: ReviewsState) => state.reviews
);

export const selectAverageRating = createSelector(
  selectReviewState,
  (state: ReviewsState) => state.averageRating
);