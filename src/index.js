import React from 'react';
import { createRoot } from 'react-dom/client';
import FictionEditor from './components/FictionEditor/FictionEditor.jsx';


const root = createRoot(document.getElementById('root'));
root.render(<FictionEditor />);
