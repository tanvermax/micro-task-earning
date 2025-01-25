import React from 'react';
import Banner from '../Shared/Banner/Banner';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import AppOfferSection from './AppOfferSection';
import PromoCard from './PromoCard';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <Section2></Section2>
            <Section4></Section4>
            <Section3></Section3>
            <Section5></Section5>
            <div className='px-5'><AppOfferSection></AppOfferSection></div>
            <Section6></Section6>
            <PromoCard></PromoCard>
        </div>
    );
};

export default Home;