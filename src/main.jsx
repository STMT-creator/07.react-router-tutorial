import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import './index.css';
import ErrorPage from './error-page.jsx';
import Contact, { loader as contactLoader } from './routes/contact.jsx';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy.jsx';
import Index from './routes/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  {
    path: 'contacts/:contactId',
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
