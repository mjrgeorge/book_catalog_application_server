import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required ',
    }),
    userName: z.string({
      required_error: 'User name is required ',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
    userName: z
      .string({
        required_error: 'User name is required ',
      })
      .optional(),
  }),
});
export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
