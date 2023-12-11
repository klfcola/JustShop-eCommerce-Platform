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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListPage from "./pages/admin/OrderListPage.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/placeorder" element={<PlaceOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListPage />} />
                <Route
                    path="/admin/productlist"
                    element={<ProductListPage />}
                />
                <Route
                    path="/admin/product/:id/edit"
                    element={<ProductEditPage />}
                />
                <Route path="/admin/userlist" element={<UserListPage />} />
                <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider deferLoading={true}>
                <RouterProvider router={routes} />
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
