export function compareDays(date1: string, date2: string) {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
}

/**
 * Native browser date picker input values converts to a day before what is displayed. Use this to match what's on the screen.
 */
export function compensateNativeDatePickerDay(date: string) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toDateString();
}