import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.fetch = jest
  .fn()
  .mockImplementationOnce(() => ({
    status: 200,
    ok: true,
    json: () =>
      new Promise((resolve, reject) => {
        resolve({ data: { games: [] } });
      }),
  }))
  .mockImplementationOnce(() => ({
    status: 500,
  }));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
