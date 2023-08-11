import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/Register";
import AdminRoute from "./AdminRoute";
import Cart from "../pages/Cart";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/cart",
                element: <PrivateRoute><Cart></Cart></PrivateRoute>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <AdminRoute><Dashboard></Dashboard></AdminRoute>
    },
]);