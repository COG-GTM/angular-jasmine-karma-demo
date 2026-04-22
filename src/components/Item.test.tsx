import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Item } from "./Item";

describe("Item component", () => {
  it("renders name, price and description", () => {
    render(<Item name="foo" description="bar" price="123" />);

    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.getByText("123 €")).toBeInTheDocument();
  });

  it("logs 'like <name>' when the like button is clicked", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    render(<Item name="mario" description="bross" price="456" />);

    await userEvent.click(screen.getByRole("button", { name: /like/i }));

    expect(infoSpy).toHaveBeenCalledWith("like mario");
    infoSpy.mockRestore();
  });
});
