import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle';


const Update = () => {

    // Get the loaded product data using useLoaderData
    const loadedProduct = useLoaderData()
    const navigate = useNavigate();

    // Function to handle updating the product
    const handelUpdateTask = async (event) => {
        event.preventDefault();
        const form = event.target;
        const product_name = form.product_name.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const rating = form.rating.value;
        const description = form.description.value;


        // Construct the updatedProduct object
        const updatedProduct = {
            product_name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            rating: parseFloat(rating),
            description,
        };

        // Send PUT request to update the product
        fetch(`https://repliq-ecommerce-server-gamma.vercel.app/products/${loadedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Updated Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/dashboard/allProducts')
                }
            })


    }


    return (
        <div className='h-full'>
            <Helmet>
                <title>REPLIQ | Update Product</title>
            </Helmet>
            <div >
                <SectionTitle heading='Update Product' />
            </div>
            <div className="bg-slate-200 rounded-lg shadow-xl mt-5">
                <div className='bg-slate-200 rounded-lg shadow-xl p-7'>

                    <form onSubmit={handelUpdateTask} className='w-[80%] mx-auto '>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" defaultValue={loadedProduct.product_name}
                                    name='product_name'
                                    className="input input-info"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Price</span>
                                </label>
                                <input type="number" defaultValue={loadedProduct.price}
                                    name='price'
                                    className="input input-info"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input type="number" defaultValue={loadedProduct.quantity}
                                    name='quantity'
                                    className="input input-info"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input min="1"
                                    max="5"
                                    step="0.01" type="number" defaultValue={loadedProduct.rating}
                                    name='rating'
                                    className="input input-info"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text"
                                name='description'
                                defaultValue={loadedProduct.description}
                                className="textarea textarea-info w-full"
                            />
                        </div>

                        <div className="form-control mt-6 text-center">
                            <input className="btn btn-block btn-info mb-6" type="submit" value='update' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;