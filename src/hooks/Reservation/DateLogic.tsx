export function calendarLogic({month, day, year}: {month: number, day: number, year: number}){
    let currentMonth = month;
    let currentDay = day;
    let currentYear = year;

    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        if (currentDay > 31) {
          day = 1;
          currentDay = 1;
          currentMonth++;
          month++;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        if (currentDay > 30) {
          day = 1;
          currentDay = 1;
          currentMonth++;
          month++;
        }
        break;
      case 2:
        if (currentDay > 28) {
          day = 1;
          currentDay = 1;
          currentMonth++;
          month++;
        }
        break;
      case 12:
        if (currentDay > 31) {
          day = 1;
          currentDay = 1;
          currentMonth = 1;
          month++;
          year++;
          currentYear++;
        }
        break;
    }

    return {currentDay, currentMonth, currentYear}
}
