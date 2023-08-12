import { useLoaderData } from "react-router-dom";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AllCustomers = () => {

    // Access loading state from AuthContext
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    // Get the data loaded using useLoaderData
    const loadedUser = useLoaderData();
    console.log(loadedUser);

    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>REPLIQ | All Customers</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='Customer List' />
                <div className="overflow-x-auto m-8 card shadow-2xl">
                    <Fade>
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr className='bg-slate-400 text-slate-800'>
                                    <th className='text-center'>Serial</th>
                                    <th className='text-center'>Photo</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Email</th>
                                    <th className='text-center'>Phone Number</th>
                                    <th className='text-center'>Role</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loadedUser.map((user, index) =>
                                        <tr key={user._id} className='font-bold'>
                                            <th className="text-center">{index + 1}</th>
                                            <th className="text-center"><img className="w-24 mx-auto" src={user?.photoURL} alt="" /></th>
                                            <td className="text-center">{user.name}</td>
                                            <td className="text-center">{user.email}</td>
                                            <td className="text-center">{user.phone}</td>
                                            <td className="text-center">{user.role}</td>
                                            
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default AllCustomers;