import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// import {} from '.';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={setupStore}> */}
    <App />
    {/* </Provider> */}
  </StrictMode>,
);
