import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { reviewSearchableFields } from './review.constant';
import { IReview, IReviewFilters } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: IReview): Promise<IReview> => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviews = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: reviewSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Review.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id);
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const result = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
