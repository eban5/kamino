import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DataLayer } from './DataLayer';
import App from './App';
import reducer, { initialState } from './reducer';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* @ts-ignore */}
      <DataLayer initialState={initialState} reducer={reducer}>
        <App />
      </DataLayer>
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById('root')
);
