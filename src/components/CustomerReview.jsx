import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import user1 from '../../public/user1.json'
import user2 from '../../public/user2.json'
import Lottie from "lottie-react";
import SectionTitle from './SectionTitle';



const CustomerReview = () => {
    return (
        <>
            <SectionTitle heading='Customer Review'></SectionTitle>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>

                {/* 1st Review Card */}
                <div className="card w-100 mx-auto bg-base-200 shadow-xl rounded-lg">
                    <div className='w-32 mx-auto'>
                        <Lottie animationData={user2}></Lottie>
                    </div>
                    <div className="card-body items-center text-center">
                        <div className='text-center'>
                            <Rating
                                placeholderRating='5'
                                readonly
                                emptySymbol={<FaRegStar></FaRegStar>}
                                placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                                fullSymbol={<FaStar></FaStar>}
                            />
                        </div>
                        <p>Overall, my experience with this Ecommerce website was nothing short of exceptional. The wide selection of products, easy-to-use interface, secure payment system, fast shipping, and outstanding customer service make it a top-notch destination for Ecommerce enthusiasts. I highly recommend this website to anyone in search of quality products and a delightful shopping experience.</p>

                    </div>
                </div>

                {/* 2nd Review Card */}
                <div className="card w-100 mx-auto bg-base-200 shadow-xl rounded-lg">
                    <div className='w-32 mx-auto'>
                        <Lottie animationData={user1}></Lottie>
                    </div>
                    <div className="card-body items-center text-center">
                        <div className='text-center'>
                            <Rating
                                placeholderRating='4.5'
                                readonly
                                emptySymbol={<FaRegStar></FaRegStar>}
                                placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                                fullSymbol={<FaStar></FaStar>}
                            />
                        </div>
                        <p>Overall, my experience with this Ecommerce website was nothing short of exceptional. The wide selection of products, easy-to-use interface, secure payment system, fast shipping, and outstanding customer service make it a top-notch destination for Ecommerce enthusiasts. I highly recommend this website to anyone in search of quality products and a delightful shopping experience.</p>

                    </div>
                </div>

                {/* 3rd Review Card */}
                <div className="card w-100 mx-auto bg-base-200 shadow-xl rounded-lg">
                    <div className='w-32 mx-auto'>
                        <Lottie animationData={user2}></Lottie>
                    </div>
                    <div className="card-body items-center text-center">
                        <div className='text-center'>
                            <Rating
                                placeholderRating='4'
                                readonly
                                emptySymbol={<FaRegStar></FaRegStar>}
                                placeholderSymbol={<FaStar className='text-warning'></FaStar>}
                                fullSymbol={<FaStar></FaStar>}
                            />
                        </div>
                        <p>Overall, my experience with this Ecommerce website was nothing short of exceptional. The wide selection of products, easy-to-use interface, secure payment system, fast shipping, and outstanding customer service make it a top-notch destination for Ecommerce enthusiasts. I highly recommend this website to anyone in search of quality products and a delightful shopping experience.</p>

                    </div>
                </div>
                
            </div>
        </>
    );
};

export default CustomerReview;