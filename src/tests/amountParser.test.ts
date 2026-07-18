import { amountParser } from "@/lib/amountParser.ts";
import { describe, expect, it } from "vitest";

describe("amountParser test", () => {
  it("amount less than 10000", () => {
    const amount = 9999;
    const parsed = amountParser(amount);
    expect(parsed).toBe("9,999");
  });

  it("amount 10000 even", () => {
    const amount = 10000;
    const parsed = amountParser(amount);
    expect(parsed).toBe("1만");
  });

  it("amount greater than 10100 when rounded", () => {
    expect(amountParser(10051)).toBe("1.01만");
    expect(amountParser(10100)).toBe("1.01만");
    expect(amountParser(11100)).toBe("1.11만");
  });

  it("amount 100_000 even", () => {
    expect(amountParser(100_000)).toBe("10만");
  });

  it("amount greater than 100_100 when rounded", () => {
    expect(amountParser(100_051)).toBe("10만");
    expect(amountParser(100_510)).toBe("10.1만");
  });

  it("amount 1_000_000 even", () => {
    expect(amountParser(1_000_000)).toBe("100만");
  });

  it("amount greater than 1_001_000 when rounded", () => {
    expect(amountParser(1_000_501)).toBe("100만");
    expect(amountParser(1_001_000)).toBe("100만");
  });

  it("amount 100_000_000 even", () => {
    expect(amountParser(100_000_000)).toBe("1억");
  });
});
