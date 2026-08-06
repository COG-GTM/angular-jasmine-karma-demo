import type { FC } from 'react';
import styles from './Item.module.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

const Item: FC<ItemProps> = ({ name, description, price }) => {
  const like = (): void => {
    console.info('like ' + name);
  };

  return (
    <div className={styles.card}>
      <header>
        <h3>{name}</h3>
      </header>
      <div>
        <p>{price} €</p>
        <p>{description}</p>
        <button type="button" aria-label="like" onClick={like}>
          favorite
        </button>
      </div>
    </div>
  );
};

export default Item;
