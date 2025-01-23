export function currentWeekLogic({
  currentWeek,
  currentMonth,
  currentDay,
  currentYear,
  i,
}: {
  currentWeek: number[];
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  i: number;
}) {
  if (!currentWeek.length) {
    currentWeek.push(currentDay);
  } else {
    if (
      (currentMonth === 1 ||
        currentMonth === 3 ||
        currentMonth === 5 ||
        currentMonth === 7 ||
        currentMonth === 8 ||
        currentMonth === 10) &&
      currentDay > 31
    ) {
      currentDay = 1;
      ++currentMonth;
      currentWeek.push(currentDay);
    } else if (
      (currentMonth === 4 ||
        currentMonth === 6 ||
        currentMonth === 9 ||
        currentMonth === 11) &&
      currentDay > 30
    ) {
      currentDay = 1;
      ++currentMonth;
      currentWeek.push(currentDay);
    } else if (currentMonth === 2 && currentDay > 28) {
      currentDay = 1;
      ++currentMonth;
      currentWeek.push(currentDay);
    } else if (currentMonth === 12 && currentDay > 31) {
      currentDay = 1;
      ++currentMonth;
      ++currentYear;
      currentWeek.push(currentDay);
    } else {
      currentWeek.push(++currentDay);
    }
  }
  i++;
}
