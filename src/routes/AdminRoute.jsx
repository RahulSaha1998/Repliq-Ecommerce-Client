import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import useAdmin from '../hooks/useAdmin';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(); // Use the useAdmin hook to check if the user is an admin
    const location = useLocation();
    const [routeLoading, setRouteLoading] = useState(true);


    // When both loading states (user and isAdmin) have resolved, update routeLoading
    useEffect(() => {
        if (!loading && !isAdminLoading) {
            setRouteLoading(false);
        }
    }, [loading, isAdminLoading]);


    // If the route is still loading, display the Loader component
    if (routeLoading) {
        return <Loader />;
    }

    // If the user is authenticated and is an admin, render the children components
    if (user && isAdmin) {
        return children;
    }


    // If the user is not authenticated or not an admin, navigate to the home page
    return <Navigate to='/' state={{ from: location }} replace={true} />;
};

export default AdminRoute;
