import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import reg from '../../public/reg.json';
import { Helmet } from 'react-helmet-async';
import SocialLogin from './SocialLogin';

const Register = () => {

    const [errors, setError] = useState(''); // State for error message
    const [success, setSuccess] = useState(''); // State for error message
    const [role, setRole] = useState("customer");

    const navigate = useNavigate();


    const { registerUser, logOut, updateUserData } = useContext(AuthContext)

    const handelRegister = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('')
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photo.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const password = form.password.value;
        console.log(name, role, email, password, photoURL);
        const saveUser = { name: name, email: email, role: role, photoURL, phone };

        if (password.length < 6) {
            return setError('Password must be greater or equal than 6 characters');
        }

        // Register user using authentication
        registerUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                updateUserData(name, photoURL); // Update user data in context
                logOut()
                console.log(loggedUser);
                form.reset();
                fetch('https://repliq-ecommerce-server-gamma.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser) // Save user data to the server
                });


                setError('')
                setSuccess('Successfully Register!');
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')

            })
            .catch(error => {
                console.log(error);
                setError('Try again there is something missing!')

            })

    }

    return (
        <div className='grid md:grid-cols-2 mx-auto'>
            <Helmet>
                <title>REPLIQ | Register</title>
            </Helmet>
            <div>
                <h2>
                    <Lottie animationData={reg}></Lottie>
                </h2>
            </div>
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-300">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Register Here!</h1>
                        <form onSubmit={handelRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name"
                                    name='name'
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL"
                                    name='photo'
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email"
                                    name='email'
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="tel"
                                    placeholder="+880"
                                    name="phone"
                                    className="input input-bordered"
                                    pattern="[0-9]{11}"
                                    title="Please enter a 11-digit phone number"
                                    required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    name='password'
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className='text-center mt-2'>
                                {
                                    <p className='text-red-700'>{errors}</p>
                                }
                                {
                                    <p className='text-blue-600'>{success}</p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>

                        </form>
                        <p className='my-4 text-center'>Already Have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;










