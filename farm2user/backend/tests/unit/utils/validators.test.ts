import { describe, it, expect } from 'vitest';
import {
    isValidEmail,
    isValidPhone,
    isValidUrl,
    isValidUUID,
    isValidProductName,
    isValidPrice,
    isValidQuantity,
    isValidFarmName,
    isValidText,
    isValidRating,
} from '@/utils/validators';

describe('Validator Utilities', () => {
    describe('isValidEmail', () => {
        it('should accept valid email', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user+tag@domain.co.uk')).toBe(true);
        });

        it('should reject invalid email', () => {
            expect(isValidEmail('invalid')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
        });

        it('should reject email exceeding max length', () => {
            const longEmail = 'a'.repeat(250) + '@example.com';
            expect(isValidEmail(longEmail)).toBe(false);
        });
    });

    describe('isValidPhone', () => {
        it('should accept valid phone numbers', () => {
            expect(isValidPhone('+15550123')).toBe(true);
            expect(isValidPhone('15550123456')).toBe(true);
            expect(isValidPhone('+442079460958')).toBe(true);
        });

        it('should reject invalid phone numbers', () => {
            expect(isValidPhone('+1-555-0123')).toBe(false);
            expect(isValidPhone('abc-def-ghij')).toBe(false);
        });
    });

    describe('isValidUrl', () => {
        it('should accept valid URLs', () => {
            expect(isValidUrl('https://example.com')).toBe(true);
            expect(isValidUrl('http://localhost:3000')).toBe(true);
        });

        it('should reject invalid URLs', () => {
            expect(isValidUrl('not a url')).toBe(false);
            expect(isValidUrl('example')).toBe(false);
        });
    });

    describe('isValidUUID', () => {
        it('should accept valid UUID v4', () => {
            expect(
                isValidUUID('550e8400-e29b-41d4-a716-446655440000')
            ).toBe(true);
        });

        it('should reject invalid UUID', () => {
            expect(isValidUUID('not-a-uuid')).toBe(false);
            expect(isValidUUID('550e8400-e29b-21d4-a716-446655440000')).toBe(false); // wrong version
        });
    });

    describe('isValidProductName', () => {
        it('should accept valid product names', () => {
            expect(isValidProductName('Organic Tomatoes')).toBe(true);
            expect(isValidProductName('Fresh Lettuce from Local Farm')).toBe(true);
        });

        it('should reject too short names', () => {
            expect(isValidProductName('AB')).toBe(false);
        });

        it('should reject too long names', () => {
            const longName = 'A'.repeat(101);
            expect(isValidProductName(longName)).toBe(false);
        });
    });

    describe('isValidPrice', () => {
        it('should accept valid prices', () => {
            expect(isValidPrice(5.99)).toBe(true);
            expect(isValidPrice(100.5)).toBe(true);
            expect(isValidPrice(0.01)).toBe(true);
        });

        it('should reject zero or negative prices', () => {
            expect(isValidPrice(0)).toBe(false);
            expect(isValidPrice(-10)).toBe(false);
        });

        it('should reject prices exceeding max', () => {
            expect(isValidPrice(1000000)).toBe(false);
        });
    });

    describe('isValidQuantity', () => {
        it('should accept positive integers', () => {
            expect(isValidQuantity(1)).toBe(true);
            expect(isValidQuantity(100)).toBe(true);
        });

        it('should reject non-integers', () => {
            expect(isValidQuantity(1.5)).toBe(false);
        });

        it('should reject zero or negative quantities', () => {
            expect(isValidQuantity(0)).toBe(false);
            expect(isValidQuantity(-5)).toBe(false);
        });
    });

    describe('isValidFarmName', () => {
        it('should accept valid farm names', () => {
            expect(isValidFarmName('Green Valley Farm')).toBe(true);
            expect(isValidFarmName('ABC')).toBe(true);
        });

        it('should reject too short names', () => {
            expect(isValidFarmName('AB')).toBe(false);
        });

        it('should reject too long names', () => {
            const longName = 'A'.repeat(101);
            expect(isValidFarmName(longName)).toBe(false);
        });
    });

    describe('isValidText', () => {
        it('should accept valid text', () => {
            expect(isValidText('Hello World')).toBe(true);
            expect(isValidText('Short')).toBe(true);
        });

        it('should reject empty text', () => {
            expect(isValidText('', 1, 500)).toBe(false);
        });

        it('should respect custom length limits', () => {
            expect(isValidText('Hello', 1, 10)).toBe(true);
            expect(isValidText('Hello World', 1, 5)).toBe(false);
        });
    });

    describe('isValidRating', () => {
        it('should accept ratings 1-5', () => {
            expect(isValidRating(1)).toBe(true);
            expect(isValidRating(3)).toBe(true);
            expect(isValidRating(5)).toBe(true);
        });

        it('should reject non-integers', () => {
            expect(isValidRating(3.5)).toBe(false);
        });

        it('should reject ratings outside 1-5', () => {
            expect(isValidRating(0)).toBe(false);
            expect(isValidRating(6)).toBe(false);
        });
    });
});
