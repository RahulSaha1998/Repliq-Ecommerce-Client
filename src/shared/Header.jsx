import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Lottie from "lottie-react";
import g2 from '../../public/g2.json'
import DarkMode from '../components/DarkMode';
import useAdmin from '../hooks/useAdmin';


const Header = () => {

    const { user, logOut, setLoading } = useContext(AuthContext);
    const [isAdmin] = useAdmin();


    const handleLogOut = () => {
        logOut()
            .then(() => setLoading(false))
            .catch(error => {
                console.log(error)
            })
    }


    const navItems = <>

        <li> <Link className='font-bold text-base' to="/">Home</Link> </li>

        {
            isAdmin ? <>
                <li> <Link className='font-bold text-base' to="/dashboard/allProducts">Admin Dashboard</Link> </li>
            </>
                :
                <>
                    <li> <Link className='font-bold text-base' to="/cart">Cart</Link> </li>
                </>
        }



        {
            user ? <>
                <button onClick={handleLogOut}>
                    <li> <Link className='font-bold text-base text-red-500'>Logout</Link> </li>
                </button>
            </>
                : <>
                    <li> <Link className='font-bold text-base' to="/login">Login</Link> </li>

                </>
        }

    </>

    return (
        <div className="navbar bg-base-300 h-28 mb-4 rounded-lg shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
                        {navItems}
                    </ul>
                </div>
                <Lottie className='w-24' animationData={g2}></Lottie>


                <div className='w-14 lg:w-52'>
                    <h2 className='font-bold lg:text-3xl'>REPLI<span className='text-red-500'>Q</span></h2>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <div>
                    <DarkMode />
                </div>
                <div className=' flex items-center gap-4'>
                    {user?.email && (
                        <div className=' w-12 mt-1'>
                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                <img className='rounded-full cursor-pointer' src={user?.photoURL} alt="" />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
};

export default Header;