import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./AppRouter";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((element, key) => {
          return <Route {...element} key={key} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-worker.js")
    .then((registration) => {
      console.log("Service Worker Registered");
      registration.scope;
    });
}
