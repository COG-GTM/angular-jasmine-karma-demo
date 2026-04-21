import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Item } from "./Item";

// Suite for the Item component.
// Mirrors `item.component.spec.ts` from the Angular version — a very basic test
// verifying the component renders (equivalent to `expect(component).toBeTruthy()`).
describe("Item: testing basic component creation", () => {
  /*
   * In the Angular version, `beforeEach` used TestBed to compile and create
   * the component. With React Testing Library there is no TestBed — we just
   * call `render()` inside each test (or inside beforeEach) to mount the
   * component into a real DOM, courtesy of jsdom.
   */
  beforeEach(() => {
    render(<Item name="foo" description="bar" price="123" />);
  });

  // Equivalent to the Angular "should create" test.
  // If the component rendered something, it "exists".
  it("should create", () => {
    expect(screen.getByTestId("item-card")).toBeInTheDocument();
  });

  it("should render the name, description and price props", () => {
    // Arrange: component was rendered in beforeEach with known props.
    // Act: (nothing to do — just read the DOM).
    // Assert: verify all the props appear in the rendered output.
    expect(screen.getByRole("heading", { name: "foo" })).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });
});

describe("Item: clicking the like button", () => {
  /*
   * `vi.spyOn` is the Vitest/Jest equivalent of Jasmine's `spyOn`. It
   * intercepts calls to an existing function so we can assert that it was
   * invoked. Here we spy on `console.info` because the Angular `like()`
   * method logged "like {name}" to the console.
   */
  let infoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    infoSpy.mockRestore();
  });

  it("logs 'like <name>' when the like button is clicked", async () => {
    // Arrange
    render(<Item name="mario" description="bross" price="456" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole("button", { name: "like" }));

    // Assert
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith("like mario");
  });
});
