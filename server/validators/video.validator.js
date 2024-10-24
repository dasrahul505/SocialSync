import { z } from 'zod';

const videoSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(5000).optional(),
  platforms: z.array(z.enum(['youtube', 'facebook', 'instagram', 'twitter'])),
});

export const validateVideoUpload = (req, res, next) => {
  try {
    videoSchema.parse(req.body);
    if (!req.file) {
      throw new Error('Video file is required');
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', errors: error.errors });
  }
};