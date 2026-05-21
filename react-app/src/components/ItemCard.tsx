import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Item } from "../models/Item";

interface ItemCardProps {
  item: Item;
}

const cardStyle: React.CSSProperties = {
  border: "0.1rem solid lightgrey",
  boxShadow: "0.3rem 0.3rem lightgrey",
  marginTop: "1rem",
  width: "90%",
  borderRadius: "4px",
  padding: "16px",
  fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 500,
  margin: 0,
  lineHeight: "32px",
};

export default function ItemCard({ item }: ItemCardProps) {
  function handleLike() {
    console.info("like " + item.name);
  }

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{item.name}</div>
      <p>{item.price} &euro;</p>
      <p>{item.description}</p>
      <IconButton
        color="error"
        aria-label="like"
        onClick={handleLike}
        sx={{ padding: "8px" }}
      >
        <FavoriteIcon />
      </IconButton>
    </div>
  );
}
