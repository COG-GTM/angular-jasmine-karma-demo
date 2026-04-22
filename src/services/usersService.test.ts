import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getUsers } from "./usersService";

describe("usersService", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("calls the JSONPlaceholder users endpoint and returns parsed users", async () => {
    const mockUsers = [
      { id: 1, name: "Alice", username: "alice", email: "alice@example.com" },
      { id: 2, name: "Bob", username: "bob", email: "bob@example.com" },
    ];
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(mockUsers), { status: 200 }),
    );

    const users = await getUsers();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      expect.objectContaining({}),
    );
    expect(users).toEqual(mockUsers);
  });

  it("throws when the response is not ok", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue(
      new Response("boom", { status: 500, statusText: "Server Error" }),
    );

    await expect(getUsers()).rejects.toThrow(/Failed to fetch users: 500/);
  });

  it("forwards the AbortSignal to fetch for cancellation", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue(new Response("[]", { status: 200 }));
    const controller = new AbortController();

    await getUsers(controller.signal);

    const [, init] = fetchMock.mock.calls[0];
    expect((init as RequestInit).signal).toBe(controller.signal);
  });
});
