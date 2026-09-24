import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import styles from './Item.module.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  return (
    <Card className={styles.card}>
      <CardHeader title={<span data-testid="item-name">{name}</span>} />
      <CardContent>
        <p data-testid="item-price">{price} €</p>
        <p data-testid="item-description">{description}</p>
        <IconButton
          aria-label="like"
          color="error"
          onClick={() => console.info('like ' + name)}
        >
          <Favorite />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Item;
