// Domain model ported 1:1 from src/app/shop/domain/item.model.ts
// Note: `price` is intentionally a string, matching the original Angular model.
export interface Item {
  name: string;
  description: string;
  price: string;
}
