import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Item.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export default function Item({ name, description, price }: ItemProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <Card className="card">
      <CardHeader title={name} />
      <CardContent>
        <p>{`${price} €`}</p>
        <p>{description}</p>
        <IconButton color="error" aria-label="like" onClick={like}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
