import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import App from './App';
import {store} from './redux/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/First task/i);
  expect(linkElement).toBeInTheDocument();
});
