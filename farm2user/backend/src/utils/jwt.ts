import jwt from 'jsonwebtoken';
import env from '@/config/env';
import { AuthPayload, RefreshPayload } from '@/types';
import { InvalidTokenError, TokenExpiredError } from './errors';

/**
 * Generate JWT access token
 * @param userId - User ID
 * @param email - User email
 * @param userType - User type (customer, farmer, admin)
 * @returns JWT token
 */
export const generateAccessToken = (
    userId: string,
    email: string,
    userType: 'customer' | 'farmer' | 'admin'
): string => {
    return jwt.sign(
        {
            userId,
            email,
            userType,
        },
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRES_IN,
        }
    );
};

/**
 * Generate JWT refresh token
 * @param userId - User ID
 * @returns JWT refresh token
 */
export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        {
            userId,
        },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        }
    );
};

/**
 * Verify access token
 * @param token - JWT token
 * @returns Decoded token payload
 */
export const verifyAccessToken = (token: string): AuthPayload => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenExpiredError('Access token has expired');
        }
        throw new InvalidTokenError('Invalid access token');
    }
};

/**
 * Verify refresh token
 * @param token - JWT refresh token
 * @returns Decoded token payload
 */
export const verifyRefreshToken = (token: string): RefreshPayload => {
    try {
        const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshPayload;
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new TokenExpiredError('Refresh token has expired');
        }
        throw new InvalidTokenError('Invalid refresh token');
    }
};

/**
 * Generate both access and refresh tokens
 * @param userId - User ID
 * @param email - User email
 * @param userType - User type
 * @returns Object with access and refresh tokens
 */
export const generateTokenPair = (
    userId: string,
    email: string,
    userType: 'customer' | 'farmer' | 'admin'
): { accessToken: string; refreshToken: string } => {
    return {
        accessToken: generateAccessToken(userId, email, userType),
        refreshToken: generateRefreshToken(userId),
    };
};

/**
 * Decode token without verification (for debugging)
 * @param token - JWT token
 * @returns Decoded payload or null
 */
export const decodeToken = (token: string): any => {
    return jwt.decode(token);
};
