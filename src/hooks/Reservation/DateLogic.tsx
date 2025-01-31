export function calendarLogic({
  month,
  day,
  year
}: {
  month: number;
  day: number;
  year: number;

}) {
  let newMonth = month;
  let newDay = day;
  let newYear = year;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
      if (newDay > 31) {
        day = 1;
        newDay = 1;
        newMonth++;
        month++;
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (newDay > 30) {
        day = 1;
        newDay = 1;
        newMonth++;
        month++;
      }
      break;
    case 2:
      if (newDay > 28) {
        day = 1;
        newDay = 1;
        newMonth++;
        month++;
      }
      break;
    case 12:
      if (newDay > 31) {
        day = 1;
        newDay = 1;
        newMonth = 1;
        month++;
        year++;
        newYear++;
      }
      break;
  }

  return { newDay, newMonth, newYear};
}
