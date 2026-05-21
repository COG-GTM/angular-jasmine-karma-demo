import ItemCard from "../components/ItemCard";
import { SHOP_ITEMS } from "../services/shopData";

export default function ShopPage() {
  return (
    <div>
      <p>items shop</p>
      {SHOP_ITEMS.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
}
