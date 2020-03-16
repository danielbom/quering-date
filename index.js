const removeTimezone = date => {
  date = new Date(date);
  const timezone = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezone);
};

const isLeapYear = year => {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

const daysOf = (month, year) => {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 1 && isLeapYear(year)) return 29;
  return months[month];
};

const processQueryDate = query => {
  const now = new Date();
  const { _day, _month, _year, _months, _days } = query;

  const day = _day ? parseInt(_day) : 1;
  const month = _month ? parseInt(_month) : now.getMonth() + 1;
  const y = _year ? parseInt(_year) : now.getFullYear();
  const year = y > 2000 ? y : 2000 + y;

  const start = new Date(`${year}-${month}-${day}`);
  const end = new Date(start);

  if (_months) {
    end.setMonth(start.getMonth() + _months);
  } else {
    end.setDate(start.getDate() + (_days || daysOf(month - 1, year)));
  }

  return { start: removeTimezone(start), end: removeTimezone(end) };
};

module.exports = processQueryDate;
