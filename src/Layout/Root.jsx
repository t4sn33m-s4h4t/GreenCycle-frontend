import Navbar from '../Components/Shared/Navbar.jsx';
import Footer from '../Components/Shared/Footer.jsx';
import { Outlet } from 'react-router-dom'; 

const Root = () => { 

    return (
        <div className="dark:bg-gray-900 text-gray-900 dark:text-gray-300 min-h-screen">
            <Navbar /> 
                <Outlet />
            
            <Footer />
        </div>
    );
};

export default Root;