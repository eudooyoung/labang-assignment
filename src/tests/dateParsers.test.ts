import { hsDateParser, lbDateParser } from "@/lib/dateParsers";
import { describe, expect, it } from "vitest";

describe.only("dateParsers test", () => {
  it("lbDateParser", () => {
    const lbDate = "2607181600";
    const parsed = lbDateParser(lbDate);
    expect(parsed).toEqual({
      date: "26.07.18 (토)",
      time: "16:00",
    });
  });

  it("hsDateParser", () => {
    const hsDate = "202607181605";
    const parsed = hsDateParser(hsDate);
    expect(parsed).toEqual({
      date: "26.07.18 (토)",
      time: "16:05",
    });
  });
});
