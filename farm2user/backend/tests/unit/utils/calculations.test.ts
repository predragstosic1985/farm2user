import { describe, it, expect } from 'vitest';
import {
    calculateDeposit,
    calculateRemainingBalance,
    formatCurrency,
    calculateTotalAmount,
    applyDiscount,
    calculatePercentage,
} from '@/utils/calculations';

describe('Calculation Utilities', () => {
    describe('calculateDeposit', () => {
        it('should calculate 30% deposit', () => {
            expect(calculateDeposit(100)).toBe(30);
            expect(calculateDeposit(50)).toBe(15);
            expect(calculateDeposit(333.33)).toBe(100);
        });

        it('should round to 2 decimal places', () => {
            expect(calculateDeposit(99.99)).toBe(30);
        });
    });

    describe('calculateRemainingBalance', () => {
        it('should calculate 70% remaining balance', () => {
            expect(calculateRemainingBalance(100)).toBe(70);
            expect(calculateRemainingBalance(50)).toBe(35);
        });
    });

    describe('formatCurrency', () => {
        it('should format currency', () => {
            const formatted = formatCurrency(100, 'USD');
            expect(formatted).toContain('100');
        });
    });

    describe('calculateTotalAmount', () => {
        it('should calculate total from quantity and price', () => {
            expect(calculateTotalAmount(5, 10)).toBe(50);
            expect(calculateTotalAmount(3, 5.99)).toBe(17.97);
        });

        it('should round to 2 decimal places', () => {
            expect(calculateTotalAmount(3, 5.99)).toBe(17.97);
        });
    });

    describe('applyDiscount', () => {
        it('should apply discount percentage', () => {
            expect(applyDiscount(100, 10)).toBe(90);
            expect(applyDiscount(50, 20)).toBe(40);
        });

        it('should throw error for invalid discount', () => {
            expect(() => applyDiscount(100, -10)).toThrow();
            expect(() => applyDiscount(100, 150)).toThrow();
        });
    });

    describe('calculatePercentage', () => {
        it('should calculate percentage of amount', () => {
            expect(calculatePercentage(100, 30)).toBe(30);
            expect(calculatePercentage(200, 25)).toBe(50);
        });
    });
});
