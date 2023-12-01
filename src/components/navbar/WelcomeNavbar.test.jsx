import { render, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WelcomeNavbar from "./WelcomeNavbar";

describe('Welcome Navbar', () => {
  it('Renders brand title as Slackify', () => {
    render(
      <MemoryRouter>
        <WelcomeNavbar />
      </MemoryRouter>
    );

    expect(screen.findByText('Slackify')).toBeTruthy();

    screen.debug();
  })
});
