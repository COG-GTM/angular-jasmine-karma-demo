import './item.scss';

export interface ItemProps {
  name: string;
  description: string;
  price: string;
}

export function Item({ name, description, price }: ItemProps) {
  const like = (): void => {
    console.info('like ' + name);
  };

  return (
    <div className="app-item">
      <div className="mat-card card">
        <div className="mat-card-header">
          <div className="mat-card-header-text">
            <div className="mat-card-title">{name}</div>
          </div>
        </div>
        <div className="mat-card-content">
          <p>{price} €</p>
          <p>{description}</p>
          <button
            type="button"
            className="mat-icon-button mat-button-base mat-warn"
            aria-label="like"
            onClick={like}
          >
            <span className="mat-button-wrapper">
              <span className="mat-icon material-icons" aria-hidden="true">
                favorite
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
