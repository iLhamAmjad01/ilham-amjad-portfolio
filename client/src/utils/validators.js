/**
 * Form validation utilities.
 */

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate required field (non-empty after trim).
 * @param {string} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate minimum length.
 * @param {string} value
 * @param {number} min
 * @returns {boolean}
 */
export const minLength = (value, min) => {
  return value && value.trim().length >= min;
};

/**
 * Validate contact form fields.
 * @param {object} values - { name, email, message, subject? }
 * @returns {object} errors - { fieldName: errorMessage }
 */
export const validateContactForm = (values) => {
  const errors = {};

  if (!isRequired(values.name)) {
    errors.name = 'Name is required';
  }

  if (!isRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!isRequired(values.message)) {
    errors.message = 'Message is required';
  } else if (!minLength(values.message, 10)) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};
