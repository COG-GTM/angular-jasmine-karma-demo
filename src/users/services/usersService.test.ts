import { describe, it, expect, vi, afterEach } from "vitest";

import { usersService } from "./usersService";

// Suite for the usersService module.
// Mirrors `UsersServices.service.spec.ts` from the Angular version — a basic
// test verifying the service module exposes a callable `getUsers` function.
describe("usersService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Equivalent of `it('should be created', ...)` in the Angular version.
  it("should be created (exposes getUsers)", () => {
    expect(usersService).toBeTruthy();
    expect(typeof usersService.getUsers).toBe("function");
  });

  it("calls the JSONPlaceholder /users endpoint via fetch", async () => {
    // Arrange: stub `fetch` with a spy that returns a fake `Response`.
    // This is an example of a "fake" test double — a simplified
    // implementation (`Response.json(...)`) used in place of a real HTTP call.
    const fakeUsers = [
      { id: 1, name: "Leanne" },
      { id: 2, name: "Ervin" },
    ];
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(fakeUsers), { status: 200 }));

    // Act
    const users = await usersService.getUsers();

    // Assert
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
    );
    expect(users).toEqual(fakeUsers);
  });

  it("throws when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("boom", { status: 500 }),
    );

    await expect(usersService.getUsers()).rejects.toThrow(
      /Failed to fetch users/,
    );
  });
});
