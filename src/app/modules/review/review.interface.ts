import { Model } from 'mongoose';

export type IReview = {
  title: string;
};

export type ReviewModel = Model<IReview>;

export type IReviewFilters = {
  searchTerm?: string;
};
