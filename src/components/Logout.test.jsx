import { render, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Logout from "./Logout";

describe('Logout', () => {
  it('Renders email from local storage', () => {
    const email = 'email@email.com';
    const mockLocalStorage = {
      getItem: () => JSON.stringify({ uid: email }),
    }

    globalThis.localStorage = mockLocalStorage;

    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText(`We'll sign you out as ${email}`, { exact: false })).toBeTruthy();

    global.localStorage = undefined;
  })
});