import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SocialLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState("customer"); // State for user role

    // Get the path to navigate back after login
    const from = location.state?.from?.pathname || '/';

    // Access signInWGoogle function from AuthContext
    const { signInWGoogle,
    } = useContext(AuthContext); 
    const handleGoogleSignIn = () => {
        signInWGoogle()
        .then(result => {
            const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role }
                fetch('https://repliq-ecommerce-server-gamma.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    navigate(from, { replace: true });
                })
        })
        .catch(error => console.log(error))

    }


    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-info">
                    <FaGoogle className='m-1' />
                    signin with google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;