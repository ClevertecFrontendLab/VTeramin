import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import { App } from './app';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        {<App />}
    </React.StrictMode>,
);
