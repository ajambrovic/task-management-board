import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {persistor, store} from './redux/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  );
  const linkElement = screen.getByText(/InProgress/i);
  expect(linkElement).toBeInTheDocument();
});
