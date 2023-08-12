import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../hooks/useAdmin';



const CardBody = ({ item }) => {

    const navigate = useNavigate();
    const location = useLocation();

    //destructure the item from the props
    const { _id, price, quantity, product_name, image, rating, description } = item;

    const [isAdmin] = useAdmin();
    const { user } = useContext(AuthContext);

    const handelAddToCart = item => {

        console.log(item);

        //if the user and user mail available than it will run
        if (user && user.email) {
            const cartItem = {
                product_name,
                email: user.email,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                rating: parseFloat(rating),
                description,
                image
            }

            //post the cart products to the Database
            fetch('http://localhost:5000/cartProducts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product added to the cart Successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })

        }
        else {
            Swal.fire({
                title: 'You have to login first to added the class!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }

    }



    return (
        <div className="card w-full h-full bg-base-300 shadow-xl">
            <figure><img className="rounded-xl my-5 lg:h-52" src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title"><span className='text-red-600 font-bold'>Product:</span>
                    {product_name}</h2>

                <h2><span className='text-red-600 font-bold'>Price:</span> <span className='font-bold'>{'$' + price}</span></h2>
                <h2><span className='text-red-600 font-bold'>Quantity:</span> <span className='font-bold'>{quantity}</span></h2>

                <div className='flex justify-between'>
                    <h2><span className='text-red-600 font-bold'>Ratings: </span> <span className="font-bold">{rating}</span> </h2>
                    <div className=''>
                        <Rating
                            placeholderRating={rating}
                            readonly
                            emptySymbol={<FaRegStar></FaRegStar>}
                            placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                            fullSymbol={<FaStar></FaStar>}
                        />
                    </div>
                </div>


                <div className="flex justify-between">
                    <button
                        onClick={() => handelAddToCart(item)} 
                        className='btn btn-info gap-2'
                        disabled={isAdmin}
                    >Add to Cart
                    </button>

                    <button
                        className='btn btn-info gap-2'
                        disabled={!user}
                    ><Link 
                    to={`/details/${_id}`}
                    >View Details </Link>
                    </button>


                </div>
            </div>
        </div>
    );
};

export default CardBody;