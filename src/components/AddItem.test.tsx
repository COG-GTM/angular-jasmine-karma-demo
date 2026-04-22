import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddItem } from "./AddItem";
import { isFormValid } from "./addItemForm";

describe("AddItem isFormValid util", () => {
  it("returns false when any field is empty", () => {
    expect(isFormValid({ name: "", description: "bar", price: "1" })).toBe(
      false,
    );
    expect(isFormValid({ name: "foo", description: "", price: "1" })).toBe(
      false,
    );
    expect(isFormValid({ name: "foo", description: "bar", price: "" })).toBe(
      false,
    );
  });

  it("returns true when all fields have non-whitespace content", () => {
    expect(isFormValid({ name: "foo", description: "bar", price: "1" })).toBe(
      true,
    );
  });
});

describe("AddItem component", () => {
  it("disables the Save button until every field has a value", async () => {
    render(<AddItem />);
    const saveBtn = screen.getByRole("button", { name: /save/i });

    expect(saveBtn).toBeDisabled();

    await userEvent.type(screen.getByLabelText("name"), "foo");
    await userEvent.type(screen.getByLabelText("description"), "bar");
    expect(saveBtn).toBeDisabled();

    await userEvent.type(screen.getByLabelText("price"), "123");
    expect(saveBtn).toBeEnabled();
  });
});
