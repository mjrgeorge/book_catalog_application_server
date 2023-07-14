import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
};

export type BookModel = Model<IBook>;

export type IBookFilters = {
  searchTerm?: string;
};
