import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Logout from "./Logout";

const uid = 'email@email.com'; 
const mockUserData = { uid };
const mockLocalStorage = {
  getItem: key => JSON.stringify(key === 'UserData' ? mockUserData : null),
  removeItem: key => { delete global.localStorage[key]; },
};

describe('Logout', () => {
  it('Renders email from local storage', () => {
    global.localStorage = mockLocalStorage;
    const mockOnClose = vi.fn();

    render(
      <MemoryRouter>
        <Logout onClose={mockOnClose} />
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText(`We'll sign you out as ${uid}`, { exact: false })).toBeTruthy();

    global.localStorage = undefined;
  });

  it('Renders to / on click of Sign out button', async () => {
    global.localStorage = mockLocalStorage;
    const mockOnClose = vi.fn();

    render(
      <MemoryRouter>
        <Logout onClose={mockOnClose} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', 
      { name: 'Sign out' }, 
      { exact: false },
    ));
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });

    global.localStorage = undefined;
  });
});


