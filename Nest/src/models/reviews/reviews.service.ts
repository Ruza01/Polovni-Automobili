import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ReviewsService {

  constructor(@InjectRepository(Review) private reviewRepo: Repository<Review>, @InjectRepository(User) private userRepo: Repository<User>) {
  }

  async createReview(reviewerId: number, createReviewDto: CreateReviewDto) {
    if (reviewerId === createReviewDto.reviewedUserId) {
      throw new BadRequestException("You cannot review yourself");
    }

    const reviewedUser = await this.userRepo.findOne({ where: { id: createReviewDto.reviewedUserId} });

    if (!reviewedUser) {
      throw new BadRequestException("User not found");
    }

    const existingReview = await this.reviewRepo.findOne({
      where: {
        reviewer: { id: reviewerId },
        reviewedUser: { id: createReviewDto.reviewedUserId }
      }
    });

    if (existingReview) {
      throw new BadRequestException("You have already reviewed this user");
    }

    const review = this.reviewRepo.create({
      reviewer: { id: reviewerId },
      reviewedUser,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    })

    return this.reviewRepo.save(review);
  }

  async getUserReviews(userId: number) {
    return this.reviewRepo.find({
      where: { reviewedUser: { id: userId } },
      relations: ['reviewer'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAverageRating(userId: number) {
    const { avg } = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.reviewedUserId = :userId', { userId })
      .getRawOne();

    return parseFloat(avg) || 0;
  }
}
