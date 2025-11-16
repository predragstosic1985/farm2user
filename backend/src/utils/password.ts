import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from '@/config/constants';

/**
 * Hash password using bcryptjs
 * @param password - Plain text password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
};

/**
 * Compare plain text password with hashed password
 * @param password - Plain text password
 * @param hash - Hashed password
 * @returns True if password matches, false otherwise
 */
export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

/**
 * Validate password strength
 * Min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
 * @param password - Password to validate
 * @returns True if valid, false otherwise
 */
export const isPasswordStrong = (password: string): boolean => {
    const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
};

/**
 * Get password strength feedback
 * @param password - Password to validate
 * @returns Feedback messages
 */
export const getPasswordFeedback = (password: string): string[] => {
    const feedback: string[] = [];

    if (password.length < 8) {
        feedback.push('Password must be at least 8 characters long');
    }
    if (!/[a-z]/.test(password)) {
        feedback.push('Password must contain lowercase letters');
    }
    if (!/[A-Z]/.test(password)) {
        feedback.push('Password must contain uppercase letters');
    }
    if (!/\d/.test(password)) {
        feedback.push('Password must contain numbers');
    }
    if (!/[@$!%*?&]/.test(password)) {
        feedback.push('Password must contain special characters (@$!%*?&)');
    }

    return feedback;
};
