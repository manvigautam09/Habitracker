// Validation rules
export const nameValidationRules = {
  required: 'Name is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters long',
  },
  maxLength: {
    value: 30,
    message: 'Name must be at most 30 characters long',
  },
};

export const emailValidationRules = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
};

export const usernameValidationRules = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'Username must be at least 3 characters long',
  },
  maxLength: {
    value: 20,
    message: 'Username must be at most 20 characters long',
  },
};

export const passwordValidationRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters long',
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      'Password must contain at least one special character, one uppercase letter, one lowercase letter, and one digit',
  },
};
