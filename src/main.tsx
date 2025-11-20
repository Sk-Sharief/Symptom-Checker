import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

(async () => {
  const AppModule = await import('./App');
  const App = (AppModule as any).default ?? AppModule;
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
