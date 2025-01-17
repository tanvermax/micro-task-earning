import React from 'react';
import Navber from '../Home/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Home/Footer';

const Mainlayout = () => {
    return (
        <div className=''>
            <Navber></Navber>
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;