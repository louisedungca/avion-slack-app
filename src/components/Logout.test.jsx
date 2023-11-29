import { render, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Logout from "./Logout";

const createMockLocalStorage = (UserData) => ({
  getItem: () => JSON.stringify(UserData),
});

describe('Logout', () => {
  it('Renders uid as email of logged in user', () => {
    const mockLocalStorage = createMockLocalStorage({ uid: "email@email.com" });
    globalThis.localStorage = mockLocalStorage;

    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText("We'll sign you out as email@email.com", { exact: false })).toBeTruthy();

    global.localStorage = undefined;
  })
});
