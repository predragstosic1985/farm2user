import { describe, it, expect } from 'vitest';
import {
    hashPassword,
    comparePassword,
    isPasswordStrong,
    getPasswordFeedback,
} from '../../../src/utils/password';

describe('Password Utilities', () => {
    const strongPassword = 'SecurePass123!';
    const weakPassword = 'weak';

    describe('hashPassword', () => {
        it('should hash password', async () => {
            const hashed = await hashPassword(strongPassword);
            expect(hashed).toBeTruthy();
            expect(hashed).not.toBe(strongPassword);
            expect(hashed.startsWith('$2')).toBe(true); // bcrypt hash prefix
        });

        it('should generate different hashes for same password', async () => {
            const hash1 = await hashPassword(strongPassword);
            const hash2 = await hashPassword(strongPassword);
            expect(hash1).not.toBe(hash2);
        });
    });

    describe('comparePassword', () => {
        it('should verify correct password', async () => {
            const hashed = await hashPassword(strongPassword);
            const isMatch = await comparePassword(strongPassword, hashed);
            expect(isMatch).toBe(true);
        });

        it('should reject incorrect password', async () => {
            const hashed = await hashPassword(strongPassword);
            const isMatch = await comparePassword('wrongPassword123!', hashed);
            expect(isMatch).toBe(false);
        });
    });

    describe('isPasswordStrong', () => {
        it('should accept strong password', () => {
            const result = isPasswordStrong(strongPassword);
            expect(result).toBe(true);
        });

        it('should reject password without uppercase', () => {
            const result = isPasswordStrong('securepass123!');
            expect(result).toBe(false);
        });

        it('should reject password without lowercase', () => {
            const result = isPasswordStrong('SECUREPASS123!');
            expect(result).toBe(false);
        });

        it('should reject password without number', () => {
            const result = isPasswordStrong('SecurePass!');
            expect(result).toBe(false);
        });

        it('should reject password without special character', () => {
            const result = isPasswordStrong('SecurePass123');
            expect(result).toBe(false);
        });

        it('should reject password less than 8 characters', () => {
            const result = isPasswordStrong('Sec1!');
            expect(result).toBe(false);
        });
    });

    describe('getPasswordFeedback', () => {
        it('should provide feedback for weak password', () => {
            const feedback = getPasswordFeedback(weakPassword);
            expect(feedback.length).toBeGreaterThan(0);
            expect(feedback.some((msg) => msg.includes('8 characters'))).toBe(true);
        });

        it('should not provide feedback for strong password', () => {
            const feedback = getPasswordFeedback(strongPassword);
            expect(feedback.length).toBe(0);
        });

        it('should suggest uppercase if missing', () => {
            const feedback = getPasswordFeedback('securepass123!');
            expect(feedback.some((msg) => msg.includes('uppercase'))).toBe(true);
        });

        it('should suggest lowercase if missing', () => {
            const feedback = getPasswordFeedback('SECUREPASS123!');
            expect(feedback.some((msg) => msg.includes('lowercase'))).toBe(true);
        });

        it('should suggest numbers if missing', () => {
            const feedback = getPasswordFeedback('SecurePass!');
            expect(feedback.some((msg) => msg.includes('number'))).toBe(true);
        });

        it('should suggest special characters if missing', () => {
            const feedback = getPasswordFeedback('SecurePass123');
            expect(feedback.some((msg) => msg.includes('special character'))).toBe(
                true
            );
        });
    });
});
