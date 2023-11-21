import React from "react";
import ReactDOM from "react-dom/client";
import "the-new-css-reset/css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/custom.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
