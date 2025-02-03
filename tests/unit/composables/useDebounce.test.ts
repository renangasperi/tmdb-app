import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "../../../src/composables/useDebounce";

describe("useDebounce", () => {
  it("should initialize with the provided value", () => {
    const { debouncedValue } = useDebounce("initial");
    expect(debouncedValue.value).toBe("initial");
  });

  it("should update the debounced value after the timeout", () => {
    vi.useFakeTimers();
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("new value");
    expect(debouncedValue.value).toBe("initial");

    vi.advanceTimersByTime(500);
    expect(debouncedValue.value).toBe("new value");

    vi.useRealTimers();
  });

  it("should clear the timeout if updateValue is called again before the timeout", () => {
    vi.useFakeTimers();
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("first value");
    vi.advanceTimersByTime(300);
    updateValue("second value");
    vi.advanceTimersByTime(300);

    expect(debouncedValue.value).toBe("initial");

    vi.advanceTimersByTime(200);
    expect(debouncedValue.value).toBe("second value");

    vi.useRealTimers();
  });

  it("should set debounced value to empty string if new value is empty", () => {
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("");
    expect(debouncedValue.value).toBe("");
  });
});
