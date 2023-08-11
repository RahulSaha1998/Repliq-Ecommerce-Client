import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import useAdmin from '../hooks/useAdmin';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    const [routeLoading, setRouteLoading] = useState(true);

    useEffect(() => {
        if (!loading && !isAdminLoading) {
            setRouteLoading(false);
        }
    }, [loading, isAdminLoading]);

    if (routeLoading) {
        return <Loader />;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace={true} />;
};

export default AdminRoute;
