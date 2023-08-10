import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header";
import Footer from "../pages/shared/Footer";

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-[calc(100vh-413px)] py-10 max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;