const ordinalSuffixOf = (day) => {
  const i = parseInt(day, 10);
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return `${i}st`;
  if (j === 2 && k !== 12) return `${i}nd`;
  if (j === 3 && k !== 23) return `${i}rd`;
  return `${i}th`;
};

const processDate = (date) => {
  const [year, month, day] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${ordinalSuffixOf(day)} ${months[month - 1]}, ${year}`;
};

export default processDate;
