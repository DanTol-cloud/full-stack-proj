import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BurgerBarContextProvider} from "./context/burgerBarContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BurgerBarContextProvider>
    <App />
  </BurgerBarContextProvider>
);

