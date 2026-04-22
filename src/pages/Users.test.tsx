import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Users } from "./Users";

describe("Users page", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("renders an empty list until Get Users is clicked, then shows fetched names", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(
      new Response(
        JSON.stringify([
          { id: 1, name: "Alice", username: "a", email: "a@x.com" },
          { id: 2, name: "Bob", username: "b", email: "b@x.com" },
        ]),
        { status: 200 },
      ),
    );

    render(<Users />);

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /get users/i }));

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
