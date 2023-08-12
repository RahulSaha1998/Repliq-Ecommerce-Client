import { useLoaderData } from "react-router-dom";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AllProducts = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    const loadedProduct = useLoaderData();
    console.log(loadedProduct);

    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>REPLIQ | ALL Products</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='Manage Users' />
                <div className="overflow-x-auto m-8 card shadow-2xl">
                    <Fade>
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr className='bg-slate-400 text-slate-800'>
                                    <th className='text-center'>Serial</th>
                                    <th className='text-center'>Photo</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>rating</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loadedProduct.map((product, index) =>
                                        <tr key={product._id} className='font-bold'>
                                            <th className="text-center">{index + 1}</th>
                                            <th className="text-center"><img className="w-24" src={product?.image} alt="" /></th>
                                            <td className="text-center">{product.product_name}</td>
                                            <td className="text-center">${product.price}</td>
                                            <td className="text-center">{product.quantity}</td>
                                            <td className="text-center">{product.rating}</td>
                                            
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

export default AllProducts;