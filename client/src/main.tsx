import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add font imports
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap";
document.head.appendChild(linkElement);

// Add title
const titleElement = document.createElement("title");
titleElement.textContent = "BuildRight Construction | General Contractor";
document.head.appendChild(titleElement);

createRoot(document.getElementById("root")!).render(<App />);
