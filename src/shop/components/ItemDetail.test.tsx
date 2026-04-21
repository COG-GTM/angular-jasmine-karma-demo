import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import type { Item } from "../domain/item.model";
import { ItemDetail } from "./ItemDetail";

// Suite for the ItemDetail component.
// Mirrors `item-detail.component.spec.ts` from the Angular version, which
// demonstrated parent-to-child data sharing via `@Input()`. In React, we do
// the same by passing props from the parent component.
describe("ItemDetail: testing props from parent (equivalent of @Input)", () => {
  let itemInput: Item;

  beforeEach(() => {
    // Arrange (shared for every test in this suite):
    // pretend we were wired to something that supplied an Item.
    itemInput = { name: "foo", description: "bar", price: "33" };
    render(<ItemDetail item={itemInput} />);
  });

  // Equivalent of the Angular "should create" test.
  it("should create", () => {
    expect(screen.getByTestId("item-detail")).toBeInTheDocument();
  });

  // Equivalent of "should get the name param value from @Input".
  it("should render the name prop value", () => {
    expect(screen.getByTestId("item-detail-name")).toHaveTextContent(
      itemInput.name,
    );
  });

  // Equivalent of "should get the description param value from @Input".
  it("should render the description prop value", () => {
    expect(screen.getByTestId("item-detail-description")).toHaveTextContent(
      itemInput.description,
    );
  });

  // Equivalent of "should get the price param value from @Input".
  it("should render the price prop value", () => {
    expect(screen.getByTestId("item-detail-price")).toHaveTextContent(
      itemInput.price,
    );
  });
});
