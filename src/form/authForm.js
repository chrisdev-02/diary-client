export const authDefaultValues = {
  name: '',
  email: '',
  password: '',
};

export const authValidationRules = {
  name: { required: 'Full name is required' },
  email: {
    required: 'Email address is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },
  password: { required: 'Password is required' },
};
