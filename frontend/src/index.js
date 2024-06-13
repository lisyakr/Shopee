import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { App } from './components/App/App.jsx';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([{ path: '*', Component: App }]);

root.render(<RouterProvider router={router} />);
