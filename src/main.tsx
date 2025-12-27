import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./i18n";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Handle 404.html redirect - restore the original path
const params = new URLSearchParams(window.location.search);
const redirect = params.get('p');
if (redirect) {
  window.history.replaceState(null, '', '/login-todo-weather/' + redirect);
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
