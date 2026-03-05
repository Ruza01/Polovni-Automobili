import { Review } from "src/app/models/Interfaces/reviews-interface";

export interface ReviewsState {
  reviews: Review[];
  averageRating: number;
}

export const initialState: ReviewsState = {
  reviews: [],
  averageRating: 0
};