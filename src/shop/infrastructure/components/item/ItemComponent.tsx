import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import './ItemComponent.scss';

export interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

/** Port of item.component.html: mat-card with title, price, description and a like button. */
export default function ItemComponent({ name, description, price }: ItemComponentProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <Card className="card">
      <CardHeader className="card-header" title={name} />
      <CardContent className="card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <IconButton color="error" aria-label="like" onClick={like}>
          <Icon>favorite</Icon>
        </IconButton>
      </CardContent>
    </Card>
  );
}
