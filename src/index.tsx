import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './loading.css';

const App = React.lazy(() =>
  import(/* webpackChunkName: "App" */ './App').then(module => ({
    default: module.App,
  }))
);

const loader = (
  <div className="container">
    <div className="loading">
      <span className="pulse spinner" />
    </div>
  </div>
);

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.Suspense fallback={loader}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.Suspense>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
