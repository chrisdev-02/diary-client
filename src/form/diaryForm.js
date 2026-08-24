export const diaryDefaultValues = {
  title: '',
  content: '',
  recordType: 'diary',
  rating: 3,
};

export const diaryValidationRules = {
  title: { required: 'Title is required' },
  content: { required: 'Content is required' },
  recordType: { required: 'Entry type is required' },
  rating: {
    required: 'Rating is required',
    min: { value: 1, message: 'Rating must be between 1 and 5' },
    max: { value: 5, message: 'Rating must be between 1 and 5' },
    valueAsNumber: true,
  },
};
