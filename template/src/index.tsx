import * as React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

import "./loading.css";

const HashRouter = React.lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.HashRouter,
  }))
);

const App = React.lazy(() => import("./App"));

const loader = (
  <div className="container">
    <div className="loading">
      <span className="pulse spinner" />
    </div>
  </div>
);

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.Suspense fallback={loader}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </React.Suspense>
);
console.log(process.env);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
