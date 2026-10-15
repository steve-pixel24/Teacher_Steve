import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { logBackendHealth } from "./utils/health.ts";

void logBackendHealth();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
