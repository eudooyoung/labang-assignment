import { useLogin } from "@/hooks/useLogin.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useLogin hook", () => {
  it("fetch is called with credentials", async () => {
    const spyFetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({} as Response);
    renderHook(() => useLogin());

    await waitFor(() => {
      expect(spyFetch).toHaveBeenCalled();
    });
    expect(spyFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        credentials: "include",
      }),
    );
  });

  it("fetch success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);
    const { result } = renderHook(() => useLogin());

    expect(result.current.loginLoading).toBe(true);
    expect(result.current.loginError).toBe(null);

    await waitFor(() => {
      expect(result.current.loginLoading).toBe(false);
    });
    expect(result.current.loginError).toBe(null);
  });

  it("fetch fails with 401", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({}),
    } as Response);
    const { result } = renderHook(() => useLogin());

    await waitFor(() => {
      expect(result.current.loginLoading).toBe(false);
    });
    expect(result.current.loginError?.message).toMatch(/unauthorized/i);
  });
});
