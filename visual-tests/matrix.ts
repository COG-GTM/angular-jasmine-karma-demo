import type { Page } from 'playwright';

export interface Viewport {
  name: 'desktop' | 'mobile';
  width: number;
  height: number;
}

export const VIEWPORTS: Viewport[] = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
];

export interface View {
  name: string;
  path: string;
  /** Interactions applied after load, before the screenshot is taken. */
  prepare?: (page: Page) => Promise<void>;
}

/**
 * Screenshot matrix derived from the Angular app's routes
 * (src/app/app-routing.module.ts): /shop, /users and the '' -> /shop redirect,
 * plus the key UI states each route can be driven into.
 */
export const VIEWS: View[] = [
  { name: 'root-redirect', path: '/' },
  { name: 'shop-default', path: '/shop' },
  {
    name: 'shop-sort-name-desc',
    path: '/shop',
    prepare: async (page) => {
      await page.getByRole('button', { name: /^Name/ }).click();
    },
  },
  {
    name: 'shop-sort-description-asc',
    path: '/shop',
    prepare: async (page) => {
      await page.getByRole('button', { name: /^Description/ }).click();
    },
  },
  {
    name: 'shop-sort-price-asc',
    path: '/shop',
    prepare: async (page) => {
      await page.getByRole('button', { name: /^Price/ }).click();
    },
  },
  { name: 'users-initial', path: '/users' },
  {
    name: 'users-loaded',
    path: '/users',
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Get Users' }).click();
      await page.locator('li').first().waitFor();
    },
  },
  { name: 'unknown-route', path: '/does-not-exist' },
];

/** Deterministic payload served to both apps in place of the live users API. */
export const USERS_FIXTURE = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
  { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
  { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' },
];
