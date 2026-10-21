import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Item.css';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <Card className="item-card card">
      {/* h6 = 20px/500, like mat-card-title inside mat-card-header */}
      <CardHeader title={name} slotProps={{ title: { variant: 'h6' } }} />
      <CardContent>
        <p>{price} €</p>
        <p>{description}</p>
        <IconButton color="error" aria-label="like" onClick={like}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
