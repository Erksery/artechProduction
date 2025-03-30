import "./index.scss";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./hooks/useModal.tsx";
import { store } from "./store/index.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);
