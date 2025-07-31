import React from 'react';
import { createRoot } from 'react-dom/client';
import FictionEditor from './components/FictionEditor/FictionEditor.jsx';
import './styles/main.css'; // Importa o TailwindCSS e estilos globais

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <FictionEditor />
    </React.StrictMode>
  );
}
