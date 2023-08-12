import { useEffect, useState } from 'react';

import CardBody from './CardBody';

const ProductCard = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [])



    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-10 lg:gap-5 p-5'>
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