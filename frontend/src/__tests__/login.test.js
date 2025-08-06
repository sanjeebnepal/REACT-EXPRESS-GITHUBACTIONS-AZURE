import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

test('renders login form elements', () => {
  render(<Login />);

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
