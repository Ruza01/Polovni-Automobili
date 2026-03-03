
export class CreateReviewDto {
  reviewedUserId: number;
  rating: number; // 1-5
  comment?: string;
}
