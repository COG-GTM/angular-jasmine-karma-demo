interface ItemComponentProps {
  name: string;
  description: string;
  price: string;
}

const cardStyles: React.CSSProperties = {
  border: '0.1rem solid lightgrey',
  boxShadow: '0.3rem 0.3rem lightgrey',
  marginTop: '1rem',
  width: '90%',
  padding: '1rem',
  borderRadius: '4px',
};

const headerStyles: React.CSSProperties = {
  marginBottom: '0.5rem',
};

const titleStyles: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 500,
  margin: 0,
};

const buttonStyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#f44336',
  fontSize: '1.5rem',
  padding: '0.5rem',
};

export const ItemComponent = (props: ItemComponentProps) => {
  const like = () => {
    console.info('like ' + props.name);
  };

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>{props.name}</h2>
      </div>
      <div>
        <p>{props.price} &euro;</p>
        <p>{props.description}</p>
        <button
          style={buttonStyles}
          aria-label="like"
          onClick={like}
        >
          &#x2764;
        </button>
      </div>
    </div>
  );
};
