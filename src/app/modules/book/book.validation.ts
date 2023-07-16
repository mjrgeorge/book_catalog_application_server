import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required ',
    }),
    author: z.string({
      required_error: 'Author is required ',
    }),
    genre: z.string({
      required_error: 'Genre is required ',
    }),
    publicationYear: z.number({
      required_error: 'Publication Year is required ',
    }),
    userEmail: z
      .string({
        required_error: 'User Email is required ',
      }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
    author: z
      .string({
        required_error: 'Author is required ',
      })
      .optional(),
    genre: z
      .string({
        required_error: 'Genre is required ',
      })
      .optional(),
    publicationYear: z
      .number({
        required_error: 'Publication Year is required ',
      })
      .optional(),
    userEmail: z
      .string({
        required_error: 'User Email is required ',
      })
      .optional(),
  }),
});
export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
