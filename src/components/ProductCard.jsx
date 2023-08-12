import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import CardBody from './CardBody';
import Loader from './Loader';

const ProductCard = () => {
    const [products, setProduct] = useState([]);
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [])



    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-3 lg:gap-5 p-5'>
                {
                    products.map(item => <CardBody
                        key={item._id}
                        item={item}
                    ></CardBody>)
                }
            </div>
        </div>

    );
};

export default ProductCard;