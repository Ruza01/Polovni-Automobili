import { Review } from "src/app/models/Interfaces/reviews-interface";

export interface ReviewsState {
  reviews: Review[];
}

export const initialState: ReviewsState = {
  reviews: [],
};