import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);

router.get('/:id', ReviewController.getSingleReview);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);

router.delete('/:id', ReviewController.deleteReview);

router.get('/', ReviewController.getAllReviews);

export const ReviewRoutes = router;
