import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import { Helmet } from 'react-helmet-async';
import ProductCard from "../components/ProductCard";
import CustomerReview from "../components/CustomerReview";


const Home = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <Helmet>
                <title>REPLIQ | Home</title>
            </Helmet>
            <div>
                <ProductCard></ProductCard>
            </div>
            <div>
                <CustomerReview></CustomerReview>
            </div>
        </div>
    );
};

export default Home;