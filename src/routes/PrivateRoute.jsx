import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(false);

    if (loading) {
        return <Loader />;
    }

    if (user) {
        return children;
    }

    if (showAlert) {
        return <Navigate to="/login" />;
    }

    // If showAlert is not true and user is not available, display the alert
    if (!user && !showAlert) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You need to be logged in to access this page.',
            confirmButtonText: 'Login',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setShowAlert(true);
            }
        });

        return null;
    }
};

export default PrivateRoute;
