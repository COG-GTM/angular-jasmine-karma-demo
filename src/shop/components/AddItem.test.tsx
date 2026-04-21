import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddItem } from "./AddItem";

// Suite for the AddItem component.
// Mirrors `add-item.component.spec.ts` from the Angular version, focused on
// testing form validation (required fields) and button-click behavior.
describe("AddItem: testing form validation", () => {
  /*
   * With React Testing Library there is no `beforeEach` + TestBed + fixture.
   * Each test renders the component, interacts with it via `userEvent`, and
   * asserts against the rendered DOM. This mirrors how a real user would
   * exercise the component.
   */

  // Equivalent of `it('should create', () => ...)` in the Angular version.
  it("should create", () => {
    render(<AddItem />);
    expect(screen.getByText("add-item works!")).toBeInTheDocument();
  });

  // Equivalent of `it('form should be invalid', () => ...)` — when all
  // required inputs are empty, the form is invalid and the save button is
  // disabled (matching `[disabled]="form.invalid"` in the Angular template).
  it("form should be invalid when required fields are empty", () => {
    // Arrange
    render(<AddItem />);

    // Act: nothing — the form starts empty.

    // Assert
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  // Equivalent of `it('form should be valid', () => ...)` — after filling in
  // every required input, the form becomes valid and the save button enables.
  it("form should be valid when all required fields are filled", async () => {
    // Arrange
    render(<AddItem />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText("name"), "foo");
    await user.type(screen.getByLabelText("description"), "bar");
    await user.type(screen.getByLabelText("price"), "33");

    // Assert
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeEnabled();
  });

  // Equivalent of the "button save should call the saveItem method???" test.
  // In the Angular version, clicking a disabled button never fired `saveItem`
  // (verified by `expect(spy).toHaveBeenCalledTimes(0)`). The same behavior
  // holds here: React/DOM doesn't dispatch click events on disabled buttons.
  it("clicking the save button while the form is invalid does not call onSave", async () => {
    // Arrange
    const onSave = vi.fn();
    render(<AddItem onSave={onSave} />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole("button", { name: /save/i }));

    // Assert
    expect(onSave).toHaveBeenCalledTimes(0);
  });

  // Equivalent of the "button save should be enabled" test — after filling in
  // all fields, clicking the button should fire the handler exactly once.
  it("save button invokes onSave exactly once when the form is valid", async () => {
    // Arrange
    const onSave = vi.fn();
    render(<AddItem onSave={onSave} />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText("name"), "foo");
    await user.type(screen.getByLabelText("description"), "bar");
    await user.type(screen.getByLabelText("price"), "33");
    await user.click(screen.getByRole("button", { name: /save/i }));

    // Assert
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      name: "foo",
      description: "bar",
      price: "33",
    });
  });
});
