# React migration notes

- The React app is side-by-side with the original Angular app under `react-app/`; Angular source files are intentionally unchanged.
- Angular Material components (`mat-card`, `mat-icon`, `mat-button`, and `mat-form-field`) will be migrated to plain semantic HTML using the existing CSS classes. MUI is intentionally not added so the migration stays dependency-light. This is a deliberate deviation from the Angular implementation for reviewer awareness.
- `Item`, `ItemDetail`, `AddItem`, `Items`, and `Users` currently contain scaffold-only placeholder components. Child agents own the component implementations.
- The router maps `/shop` to `Items`, `/users` to `Users`, and redirects `/` to `/shop`.
