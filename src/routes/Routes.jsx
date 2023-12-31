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
import AddProduct from "../pages/Dashboard/AddProduct";
import AllCustomers from "../pages/Dashboard/AllCustomers";
import AllProducts from "../pages/Dashboard/AllProducts";
import UpdateProduct from "../pages/Dashboard/UpdateProduct";
import ViewDetails from "../pages/ViewDetails";
import Checkout from "../pages/Checkout";
import NotFoundPage from "../components/NotFoundPage";

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
            {
                path: "/cart/checkout",
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: "/details/:id",
                element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://repliq-ecommerce-server-gamma.vercel.app/products/${params.id}`)
            },
            
        ]
    },
    {
        path: "/dashboard",
        element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
        children: [
            {
                path: "/dashboard/addProduct",
                element: <AddProduct></AddProduct>
            },
            {
                path: "/dashboard/allCustomers",
                element: <AllCustomers></AllCustomers>,
                loader: () => fetch('https://repliq-ecommerce-server-gamma.vercel.app/users')
            },
            {
                path: "/dashboard/allProducts",
                element: <AllProducts></AllProducts>,
                loader: () => fetch('https://repliq-ecommerce-server-gamma.vercel.app/products')
            },
            {
                path: "/dashboard/updateProduct/:id",
                element: <UpdateProduct></UpdateProduct>,
                loader: ({ params }) => fetch(`https://repliq-ecommerce-server-gamma.vercel.app/products/${params.id}`)
            }
            
        ]
    },
    {
        path: '*',
        element: <NotFoundPage></NotFoundPage>
      }
]);