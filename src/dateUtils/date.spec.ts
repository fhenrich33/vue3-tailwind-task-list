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
    expect(compensateNativeDatePickerDay(day2).toISOString()).toBe("2022-03-04T00:00:00.000Z");
    expect(compensateNativeDatePickerDay(day3).toISOString()).toBe("2023-03-04T00:00:00.000Z");
    expect(compensateNativeDatePickerDay(day4).toISOString()).toBe("2023-04-21T00:00:00.000Z");
  });
});
