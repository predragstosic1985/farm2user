import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { ValidationError } from '@/utils/errors';

/**
 * Request validation middleware using Joi
 * Validates request body, query, and params against schema
 */
export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const { error, value } = schema.validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                {
                    abortEarly: false,
                    allowUnknown: true,
                    stripUnknown: true,
                }
            );

            if (error) {
                const errors = error.details.map((detail) => ({
                    field: detail.path.join('.'),
                    message: detail.message,
                }));
                throw new ValidationError('Validation failed', errors);
            }

            // Update request with validated data
            if (value.body) req.body = value.body;
            if (value.query) req.query = value.query;
            if (value.params) req.params = value.params;

            next();
        } catch (error) {
            next(error);
        }
    };
};

/**
 * Common validation schemas
 */
export const schemas = {
    // Email schema
    email: Joi.string().email().max(254).required(),

    // Password schema (min 8 chars, must have uppercase, lowercase, number, special char)
    password: Joi.string()
        .min(8)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
        )
        .required()
        .messages({
            'string.pattern.base':
                'Password must contain uppercase, lowercase, number and special character',
        }),

    // UUID schema
    uuid: Joi.string()
        .uuid()
        .required(),

    // Pagination schemas
    limit: Joi.number().integer().min(1).max(100).default(20),
    offset: Joi.number().integer().min(0).default(0),
    page: Joi.number().integer().min(1).default(1),

    // Product schema
    productName: Joi.string().min(3).max(100).required(),
    price: Joi.number().positive().precision(2).max(999999.99).required(),
    quantity: Joi.number().integer().positive().required(),

    // Farm schema
    farmName: Joi.string().min(3).max(100).required(),
    registrationNumber: Joi.string()
        .regex(/^[A-Za-z0-9\-]{5,20}$/)
        .optional(),

    // Rating schema
    rating: Joi.number().integer().min(1).max(5).required(),

    // Text field
    text: Joi.string()
        .min(1)
        .max(500)
        .required(),

    // Optional text field
    optionalText: Joi.string()
        .min(1)
        .max(500)
        .optional()
        .allow(null, ''),

    // Phone schema
    phone: Joi.string()
        .regex(/^\+?[1-9]\d{1,14}$/)
        .optional()
        .allow(null, ''),

    // URL schema
    url: Joi.string()
        .uri()
        .optional()
        .allow(null, ''),

    // Date schema
    date: Joi.date().iso().required(),

    // Future date schema
    futureDate: Joi.date()
        .iso()
        .min('now')
        .required(),

    // Array schema
    array: Joi.array().min(1).required(),

    // Boolean schema
    boolean: Joi.boolean().default(false),
};
