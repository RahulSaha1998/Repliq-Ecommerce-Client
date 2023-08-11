import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "./Loader";

const Home = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2>This is Home</h2>
        </div>
    );
};

export default Home;