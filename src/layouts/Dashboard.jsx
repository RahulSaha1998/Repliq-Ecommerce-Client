import { FaBook, FaBoxOpen, FaHome, FaPlus, FaPlusCircle, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-slate-300 text-base-content">
                    <li><NavLink to="/dashboard/adminhome"><FaHome></FaHome> Admin Home</NavLink></li>
                    <li><NavLink to="/dashboard/addProduct"> <FaPlusCircle></FaPlusCircle> Add Product</NavLink></li>
                    <li><NavLink to="/dashboard/allProducts"><FaBoxOpen></FaBoxOpen>All Products</NavLink></li>
                    <li><NavLink to="/dashboard/allCustomers"><FaUsers></FaUsers> All Customers</NavLink></li>

                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;