import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// createRootにすると並行モードを有効になるっぽい
// https://ja.reactjs.org/docs/concurrent-mode-reference.html
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
