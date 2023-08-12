import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const CardBody = ({ item }) => {

    const { _id, price, quantity, product_name, image, rating } = item;
    // console.log(item);

    

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

                    <Link to={`/details/${_id}`}>
                        <button onClick={() => handleDetails(_id)} className='btn btn-info gap-2'>Add to Cart</button>
                    </Link>
                    <Link to={`/details/${_id}`}>
                        <button onClick={() => handleDetails(_id)} className='btn btn-info gap-2'>View Details</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default CardBody;