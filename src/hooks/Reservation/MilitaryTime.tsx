export function miliaryTimeConversion(properTimeDisplay: string[]) {
  return properTimeDisplay.map((time: string) => {
    const hours = parseInt(time.split(":")[0]);

    if (parseInt(time) > 12) {
      //data structure of 1:00PM, 13:00
      return [(hours - 12).toString() + ":00PM", time];
    } else if (parseInt(time) === 12) {
      //data structure of 12:00PM, 12:00
      return [hours + ":00PM", time];
    } else {
      //data structure of 1:00AM, 1:00
      return [hours + ":00AM", time];
    }
  });
}
