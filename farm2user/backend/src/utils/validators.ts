/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
};

/**
 * Phone number validation (international format)
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * URL validation
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * UUID v4 validation
 */
export const isValidUUID = (uuid: string): boolean => {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};

/**
 * Product name validation
 */
export const isValidProductName = (name: string): boolean => {
    return name.length >= 3 && name.length <= 100;
};

/**
 * Price validation
 */
export const isValidPrice = (price: number): boolean => {
    return price > 0 && price <= 999999.99;
};

/**
 * Quantity validation
 */
export const isValidQuantity = (quantity: number): boolean => {
    return Number.isInteger(quantity) && quantity > 0;
};

/**
 * Farm name validation
 */
export const isValidFarmName = (name: string): boolean => {
    return name.length >= 3 && name.length <= 100;
};

/**
 * Registration number validation (alphanumeric with dashes)
 */
export const isValidRegistrationNumber = (number: string): boolean => {
    const regexRegex = /^[A-Za-z0-9\-]{5,20}$/;
    return regexRegex.test(number);
};

/**
 * Postal code validation (basic)
 */
export const isValidPostalCode = (code: string): boolean => {
    const postalRegex = /^[A-Za-z0-9]{3,10}$/;
    return postalRegex.test(code);
};

/**
 * Text field validation
 */
export const isValidText = (text: string, minLength = 1, maxLength = 500): boolean => {
    return text.length >= minLength && text.length <= maxLength;
};

/**
 * Array validation
 */
export const isValidArray = <T>(
    array: T[],
    minLength = 0,
    maxLength = 1000
): boolean => {
    return Array.isArray(array) && array.length >= minLength && array.length <= maxLength;
};

/**
 * Date validation
 */
export const isValidDate = (date: any): boolean => {
    if (!(date instanceof Date)) {
        return false;
    }
    return !isNaN(date.getTime());
};

/**
 * Future date validation
 */
export const isFutureDate = (date: Date): boolean => {
    return date > new Date();
};

/**
 * Rating validation (1-5 stars)
 */
export const isValidRating = (rating: number): boolean => {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

/**
 * Category validation
 */
export const isValidCategory = (
    category: string,
    validCategories: string[]
): boolean => {
    return validCategories.includes(category);
};
