import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../auth/decorators/role-decorator';
import { Role } from '../auth/enums/role-enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MEMBER)
  createReview(@Req() req, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(req.user.id, createReviewDto);
  }

  @Get('user/:userId')
  getUserReviews(@Param('userId') userId: number) {
    return this.reviewsService.getUserReviews(userId);
  }

  @Get('user/:userId/average')
  getAverageRating(@Param('userId') userId: number) {
    return this.reviewsService.getAverageRating(userId);
  }
}
