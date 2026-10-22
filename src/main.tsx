import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { CartProvider } from "./lib/cart";
import { RouterProvider } from "./lib/router";
import { ToastProvider } from "./lib/toast";
import "./styles/app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </RouterProvider>
  </StrictMode>,
);
