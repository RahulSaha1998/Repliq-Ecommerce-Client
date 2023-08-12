import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import { Helmet } from 'react-helmet-async';


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
            <h2>This is Home</h2>
        </div>
    );
};

export default Home;