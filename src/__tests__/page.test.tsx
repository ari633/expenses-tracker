import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from "../app/page";


// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  }))
}));


describe("Home", () => {

  it('renders welcome message and sign in/sign up buttons', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Expenses Tracker App')).toBeDefined();
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();

  });
});