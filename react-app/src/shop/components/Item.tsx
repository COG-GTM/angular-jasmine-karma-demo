import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Item.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export const Item = ({ name, description, price }: ItemProps) => {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <Card className="card">
      <CardHeader title={name} />
      <CardContent>
        <p>{price} €</p>
        <p>{description}</p>
        <IconButton color="warning" aria-label="like" onClick={like}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
