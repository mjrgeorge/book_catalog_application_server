import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Review } from '../review/review.model';
import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { Book } from './book.model';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully !',
    data: result,
  });
});

const updateBookWithReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.id;
      const updatedData = req.body;

      const newReview = await Review.create(updatedData);
      const newBook = await Book.findByIdAndUpdate(
        bookId,
        {
          $push: { reviews: newReview._id },
        },
        { new: true, useFindAndModify: false }
      );

      res.send(newBook);
    } catch (error) {
      next(error);
    }
  }
);

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully !',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  updateBookWithReview,
  deleteBook,
};
