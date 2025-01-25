import React from 'react';
import Navber from '../Home/Navber';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Home/Footer';

const Mainlayout = () => {
    const location = useLocation();
    const noHeaderfoot = location.pathname.includes('dashbord');
    return (
        <div className=''>
           {noHeaderfoot || <Navber></Navber>}
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
            {noHeaderfoot ||   <Footer></Footer>}
        </div>
    );
};

export default Mainlayout;