import React from "react";
import ReactDOM from "react-dom/client";
import "the-new-css-reset/css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "the-new-css-reset/css/reset.css";
import "./assets/styles/custom.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>
);

reportWebVitals();
