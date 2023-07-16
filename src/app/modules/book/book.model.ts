import mongoose, { Schema, model } from 'mongoose';
import { IBook } from './book.interface';
import { Review } from '../review/review.model';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook>('Book', bookSchema);
