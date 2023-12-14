import { screen } from '@testing-library/react';
import { renderWithProviders } from 'util/test-util';
import App from './App';

test('renders page', () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/InProgress/i);
  expect(linkElement).toBeInTheDocument();
});
