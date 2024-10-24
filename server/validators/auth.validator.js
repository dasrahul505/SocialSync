import { z } from 'zod';

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const validateRegistration = (req, res, next) => {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', errors: error.errors });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', errors: error.errors });
  }
};