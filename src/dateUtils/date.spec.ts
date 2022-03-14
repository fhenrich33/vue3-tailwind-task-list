import { compareDays, compensateNativeDatePickerDay } from "./date";

describe("Date utils", () => {
  // Same format as the native browser date picker.
  const day1 = "2022-03-03";
  const day2 = "2022-03-03";
  const day3 = "2023-03-03";
  const day4 = "2023-04-20";

  it("compare dates", () => {
    expect(compareDays(day1, day2)).toBeTruthy;
    expect(compareDays(day1, day3)).toBeFalsy;
    expect(compareDays(day1, day4)).toBeTruthy;
  });

  it("adds a day to the native picker input value", () => {
    expect(compensateNativeDatePickerDay(day2).toDateString()).toBe("Thu Mar 03 2022");
    expect(compensateNativeDatePickerDay(day3).toDateString()).toBe("Fri Mar 03 2023");
    expect(compensateNativeDatePickerDay(day4).toDateString()).toBe("Thu Apr 20 2023");
  });
});
