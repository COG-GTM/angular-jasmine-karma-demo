import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersComponent from './UsersComponent';
import { USERS_URL } from '../../../application/usersService';

describe('UsersComponent', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the intro text, the Get Users button and an empty list', () => {
    render(<UsersComponent />);
    expect(screen.getByText('users works!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Users' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });

  it('does not fetch until the button is clicked', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<UsersComponent />);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetches users on click and renders each name as a list item', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify([{ name: 'Leanne Graham' }, { name: 'Ervin Howell' }])),
      );
    vi.stubGlobal('fetch', fetchMock);
    render(<UsersComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'Leanne Graham',
      'Ervin Howell',
    ]);
    expect(fetchMock).toHaveBeenCalledWith(USERS_URL, expect.anything());
    expect(console.info).toHaveBeenCalledWith('getUsers');
  });

  it('aborts an in-flight request on unmount', async () => {
    let signal: AbortSignal | undefined;
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init: RequestInit) => {
        signal = init.signal ?? undefined;
        return new Promise<Response>(() => {});
      }),
    );
    const { unmount } = render(<UsersComponent />);
    await userEvent.click(screen.getByRole('button', { name: 'Get Users' }));
    expect(signal?.aborted).toBe(false);
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
