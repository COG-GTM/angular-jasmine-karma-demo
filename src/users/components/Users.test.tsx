import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Users } from "./Users";
import { usersService } from "../services/usersService";

// Suite for the Users component.
// Mirrors `users.component.spec.ts` from the Angular version, which
// demonstrated how to test a component that calls a service by replacing the
// service's method with a spy.
describe("Users: testing calling a service from a component", () => {
  afterEach(() => {
    // Reset every spy created inside a test so state doesn't leak between
    // tests — equivalent to Jasmine's automatic spy teardown between specs.
    vi.restoreAllMocks();
  });

  it("should create", () => {
    render(<Users />);
    expect(screen.getByText("users works!")).toBeInTheDocument();
  });

  it("getUsers() should populate the rendered list with the users returned by the service", async () => {
    // 1º Arrange: we doubled the service.
    // `vi.spyOn(...).mockResolvedValue(...)` is the Vitest equivalent of
    // Jasmine's `spyOn(service, 'getUsers').and.returnValue(of(...))`:
    // it intercepts the real method and returns a controlled value.
    const fakeUsers = [
      { id: 1, name: "foo" },
      { id: 2, name: "bar" },
      { id: 3, name: "mario" },
    ];
    const spy = vi
      .spyOn(usersService, "getUsers")
      .mockResolvedValue(fakeUsers);

    render(<Users />);
    const user = userEvent.setup();

    // 2º Act: click the button that triggers `getUsers()` on the component.
    await user.click(screen.getByRole("button", { name: /get users/i }));

    // 3º Assert: we expect the spy to have been called and the names
    // returned by the stubbed service to appear in the rendered list.
    expect(spy).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText("foo")).toBeInTheDocument();
      expect(screen.getByText("bar")).toBeInTheDocument();
      expect(screen.getByText("mario")).toBeInTheDocument();
    });
  });
});
