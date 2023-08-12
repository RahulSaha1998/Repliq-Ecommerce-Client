import { Link, useLoaderData } from "react-router-dom";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { Fade } from "react-awesome-reveal";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';

const AllProducts = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    const loadedProduct = useLoaderData();
    
    const [products, setProducts] = useState(loadedProduct);


    const handleDelete = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/products/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successful!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const remaining = products.filter(product => product._id !== _id);
                    setProducts(remaining);
                }
            })
    }


    return (
        <div className='w-full h-full'>
            <Helmet>
                <title>REPLIQ | Product List</title>
            </Helmet>
            <div className="overflow-x-auto">
                <SectionTitle heading='Product List' />
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
                                    <th className='text-center'>Delete</th>
                                    <th className='text-center'>Update</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) =>
                                        <tr key={product._id} className='font-bold'>
                                            <th className="text-center">{index + 1}</th>
                                            <th className="text-center"><img className="w-24" src={product?.image} alt="" /></th>
                                            <td className="text-center">{product.product_name}</td>
                                            <td className="text-center">${product.price}</td>
                                            <td className="text-center">{product.quantity}</td>
                                            <td className="text-center">{product.rating}</td>
                                            <td className='text-center'><Link to={`/dashboard/updateProduct/${product._id}`}>
                                        <button className='btn btn-info'>Update</button>
                                    </Link></td>
                                            <td className='text-center'><button onClick={() => handleDelete(product._id)} className='btn btn-error'>Delete</button></td>
                                            
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