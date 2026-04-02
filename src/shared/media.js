export const ratioPadding = {
  '1:1': '100%',
  '3:4': '133.333%',
  '2:3': '150%',
  '9:16': '177.778%'
};

export const filterByQuery = (items, query) => {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
};
