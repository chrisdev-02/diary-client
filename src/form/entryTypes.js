export const entryTypes = [
  { value: 'diary', label: 'Diary' },
  { value: 'book', label: 'Books' },
  { value: 'game', label: 'Games' },
  { value: 'show', label: 'Shows' },
  { value: 'place', label: 'Places' },
];

export const ratedEntryTypes = ['book', 'game', 'show'];

export const isRatedEntryType = (type) => ratedEntryTypes.includes(type);
