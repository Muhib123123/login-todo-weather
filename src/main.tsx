import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./i18n";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Handle 404.html redirect
if (window.location.pathname.includes('?p=')) {
  const path = '/' + new URLSearchParams(window.location.search).get('p');
  window.history.replaceState(null, '', window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/')) + path + window.location.hash);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/login-todo-weather">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
