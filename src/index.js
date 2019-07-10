/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import StatsCol from './StatsCol';
import SelectCol from './SelectCol';

import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <main className="flex">
        <StatsCol />
        <SelectCol />
      </main>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
