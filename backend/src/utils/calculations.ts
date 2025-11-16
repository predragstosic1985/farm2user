/**
 * Calculate 30% deposit amount per business requirements
 * @param totalAmount Total reservation amount
 * @returns Deposit amount (30% of total)
 */
export const calculateDeposit = (totalAmount: number): number => {
    const deposit = totalAmount * 0.3;
    // Round to 2 decimal places
    return Math.round(deposit * 100) / 100;
};

/**
 * Calculate remaining balance to pay
 * @param totalAmount Total reservation amount
 * @returns Remaining amount (70% of total)
 */
export const calculateRemainingBalance = (totalAmount: number): number => {
    const remaining = totalAmount * 0.7;
    return Math.round(remaining * 100) / 100;
};

/**
 * Format currency
 * @param amount Amount in base currency
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

/**
 * Parse currency string to number
 * @param currencyString Currency string (e.g., "$123.45")
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
    const numberString = currencyString.replace(/[^0-9.-]/g, '');
    return parseFloat(numberString);
};

/**
 * Calculate total amount from quantity and unit price
 * @param quantity Quantity ordered
 * @param unitPrice Price per unit
 * @returns Total amount
 */
export const calculateTotalAmount = (quantity: number, unitPrice: number): number => {
    const total = quantity * unitPrice;
    return Math.round(total * 100) / 100;
};

/**
 * Apply discount percentage
 * @param amount Original amount
 * @param discountPercent Discount percentage (0-100)
 * @returns Discounted amount
 */
export const applyDiscount = (amount: number, discountPercent: number): number => {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Discount percentage must be between 0 and 100');
    }
    const discounted = amount * (1 - discountPercent / 100);
    return Math.round(discounted * 100) / 100;
};

/**
 * Calculate percentage of amount
 * @param amount Base amount
 * @param percent Percentage to calculate
 * @returns Percentage of amount
 */
export const calculatePercentage = (amount: number, percent: number): number => {
    const calculated = (amount * percent) / 100;
    return Math.round(calculated * 100) / 100;
};
