import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-[calc(100vh-413px)] max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            <div className="mt-10">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;