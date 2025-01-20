// inputs date string - month, day, and day of week
// based on month, check for holiday
// insert holiday logic for holidays without specific date
// ie. third monday in january
// if the date matches the holiday date, return true
// else return false

export function CheckHolidays({
  month,
  day,
  dayOfWeek,
  year,
}: {
  month: number;
  day: number;
  dayOfWeek: number;
  year: number;
}) {
  // New Year's Day: January 1
  if (month === 1 && day === 1) {
    return true;
  } else if (month === 1 && dayOfWeek === 1) {
    // Martin Luther King, Jr. Day: The third Monday in January (1)

    const firstMonday = day - 14;
    const getFirstMondayDay = new Date(year, month - 1, firstMonday).getDay();
    const secondMonday = day - 7;
    const getSecondMondayDay = new Date(year, month - 1, secondMonday).getDay();
    const fourthMonday = day + 7;
    const getFourthMondayDay = new Date(year, month - 1, fourthMonday).getDay();
    if (
      firstMonday > 0 &&
      secondMonday > 0 &&
      fourthMonday < 31 &&
      getFourthMondayDay === 1 &&
      getFirstMondayDay === 1 &&
      getSecondMondayDay === 1
    ) {
      return true;
    }
  } else if (month === 5) {
    // Memorial Day: The last Monday in May
    if (day + 7 > 31 && dayOfWeek === 1) {
      return true;
    }
  } else if (month === 7 && day === 4) {
    // Independence Day: July 4
    return true;
  } else if (month === 9) {
    // Labor Day: The first Monday in September
    if (day - 7 < 1 && dayOfWeek === 1) {
      return true;
    }
  } else if (month === 10 && dayOfWeek === 1) {
    // Columbus Day: The second Monday in October
    const firstMonday = day - 7;
    const getFirstMondayDay = new Date(year, month - 1, firstMonday).getDay();

    if (
      firstMonday > 0 &&
      getFirstMondayDay === 1) {
        console.log('test')
      return true;
    }
  } else if (month === 11 && day === 11) {
    // Veterans' Day: November 11
    return true;
  } else if (
    (month === 12 && day === 24) ||
    (month === 12 && day === 25) ||
    (month === 12 && day === 31)
  ) {
    // Christmas Eve: December 24
    // Christmas Day: December 25
    // New Years Day: December 31

    return true;
  }
  return false;
}
