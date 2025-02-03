import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApi } from "../../../src/composables/useApi";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

vi.mock("vue-toast-notification", () => ({
  useToast: vi.fn(),
}));

describe("useApi", () => {
  const mockFetch = vi.fn();
  const mockToast = {
    open: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = mockFetch;
    (useToast as any).mockReturnValue(mockToast);
  });

  it("should initialize with default values", () => {
    const { data, error, loading } = useApi();
    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
    expect(loading.value).toBe(false);
  });

  it("should fetch data successfully", async () => {
    const mockData = { id: 1, name: "Test Movie" };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as any;

    const { get, data, error, loading } = useApi<typeof mockData>();

    const result = await get("movie/1");

    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBe(null);
    expect(result).toEqual(mockData);
  });

  it("should handle fetch error", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as any;

    const { get, data, error, loading } = useApi();

    const result = await get("movie/1");

    expect(loading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
    expect(result).toBe(null);
    expect(mockToast.open).toHaveBeenCalledWith({
      message: "Falha ao realizar a requisição.",
      type: "error",
      duration: 2000,
    });
  });

  it("should handle fetch exception", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error("Fetch error"))
    ) as any;

    const { get, data, error, loading } = useApi();

    const result = await get("movie/1");

    expect(loading.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
    expect(result).toBe(null);
    expect(mockToast.open).toHaveBeenCalledWith({
      message: "Falha ao realizar a requisição.",
      type: "error",
      duration: 2000,
    });
  });
});
