import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import AppRoutes from "./routes/index.tsx";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
