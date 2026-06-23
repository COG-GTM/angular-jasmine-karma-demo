import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './item.scss';

interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export default function Item({ name, description, price }: ItemProps) {
  const like = () => {
    console.info('like ' + name);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{name}</div>
      </div>
      <div className="card-content">
        <p>{price} €</p>
        <p>{description}</p>
        <IconButton color="error" aria-label="like" onClick={like}>
          <FavoriteIcon />
        </IconButton>
      </div>
    </div>
  );
}
