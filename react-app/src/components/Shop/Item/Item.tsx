interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const handleLike = () => {
    console.info('like ' + name);
  };

  return (
    <div style={{ display: 'inline' }}>
      <div
        style={{
          border: '0.1rem solid lightgrey',
          boxShadow: '0.3rem 0.3rem lightgrey',
          marginTop: '1rem',
          width: '90%',
          borderRadius: '4px',
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          backgroundColor: '#fff',
          display: 'block',
          padding: '16px',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        <div style={{ display: 'flex', padding: '0', margin: '0' }}>
          <div style={{
            margin: '0 16px',
            display: 'block',
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '20px',
              margin: '0 0 12px',
              padding: '0',
              display: 'block',
            }}>
              {name}
            </div>
          </div>
        </div>
        <div style={{ padding: '0', margin: '0' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '20px' }}>{price} €</p>
          <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '20px' }}>{description}</p>
          <button
            aria-label="like"
            onClick={handleLike}
            style={{
              padding: '1px 6px',
              margin: '0',
              display: 'inline-block',
              fontSize: '13.3333px',
              lineHeight: 'normal',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              className="material-icons"
              style={{
                fontSize: '24px',
                lineHeight: '24px',
                display: 'inline-block',
                width: '24px',
                height: '24px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              favorite
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
