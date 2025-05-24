import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.querySelector('#root') as never as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
);
