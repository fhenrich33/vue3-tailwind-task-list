export function compareDays(date1: string, date2: string) {
  return new Date(date1).getDay() === new Date(date2).getDay();
}
