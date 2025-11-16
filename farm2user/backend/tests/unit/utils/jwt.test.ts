import { describe, it, expect, beforeEach } from 'vitest';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateTokenPair,
    decodeToken,
} from '../../../src/utils/jwt';
import { InvalidTokenError, TokenExpiredError } from '../../../src/utils/errors';

describe('JWT Utilities', () => {
    const testUserId = '550e8400-e29b-41d4-a716-446655440000';
    const testEmail = 'test@example.com';
    const testUserType = 'customer' as const;

    describe('generateAccessToken', () => {
        it('should generate valid access token', () => {
            const token = generateAccessToken(testUserId, testEmail, testUserType);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');
            expect(token.split('.').length).toBe(3); // JWT has 3 parts
        });

        it('should include user data in token', () => {
            const token = generateAccessToken(testUserId, testEmail, testUserType);
            const decoded = decodeToken(token);
            expect(decoded.userId).toBe(testUserId);
            expect(decoded.email).toBe(testEmail);
            expect(decoded.userType).toBe(testUserType);
        });
    });

    describe('generateRefreshToken', () => {
        it('should generate valid refresh token', () => {
            const token = generateRefreshToken(testUserId);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');
            expect(token.split('.').length).toBe(3);
        });

        it('should include userId in refresh token', () => {
            const token = generateRefreshToken(testUserId);
            const decoded = decodeToken(token);
            expect(decoded.userId).toBe(testUserId);
        });
    });

    describe('verifyAccessToken', () => {
        it('should verify valid access token', () => {
            const token = generateAccessToken(testUserId, testEmail, testUserType);
            const payload = verifyAccessToken(token);
            expect(payload.userId).toBe(testUserId);
            expect(payload.email).toBe(testEmail);
            expect(payload.userType).toBe(testUserType);
        });

        it('should throw error for invalid token', () => {
            expect(() => verifyAccessToken('invalid.token.here')).toThrow(
                InvalidTokenError
            );
        });

        it('should throw error for malformed token', () => {
            expect(() => verifyAccessToken('not.a.jwt')).toThrow(InvalidTokenError);
        });
    });

    describe('verifyRefreshToken', () => {
        it('should verify valid refresh token', () => {
            const token = generateRefreshToken(testUserId);
            const payload = verifyRefreshToken(token);
            expect(payload.userId).toBe(testUserId);
        });

        it('should throw error for invalid refresh token', () => {
            expect(() => verifyRefreshToken('invalid.token.here')).toThrow(
                InvalidTokenError
            );
        });
    });

    describe('generateTokenPair', () => {
        it('should generate both access and refresh tokens', () => {
            const { accessToken, refreshToken } = generateTokenPair(
                testUserId,
                testEmail,
                testUserType
            );
            expect(accessToken).toBeTruthy();
            expect(refreshToken).toBeTruthy();
        });

        it('should generate verifiable token pair', () => {
            const { accessToken, refreshToken } = generateTokenPair(
                testUserId,
                testEmail,
                testUserType
            );
            const accessPayload = verifyAccessToken(accessToken);
            const refreshPayload = verifyRefreshToken(refreshToken);
            expect(accessPayload.userId).toBe(testUserId);
            expect(refreshPayload.userId).toBe(testUserId);
        });
    });

    describe('decodeToken', () => {
        it('should decode valid token without verification', () => {
            const token = generateAccessToken(testUserId, testEmail, testUserType);
            const decoded = decodeToken(token);
            expect(decoded).toBeTruthy();
            expect(decoded.userId).toBe(testUserId);
        });

        it('should return null for invalid token', () => {
            const decoded = decodeToken('invalid.token.here');
            expect(decoded).toBeNull();
        });
    });
});
