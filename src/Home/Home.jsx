import React, { useEffect } from "react";
import Banner from "../Shared/Banner/Banner";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import AppOfferSection from "./AppOfferSection";
import PromoCard from "./PromoCard";
import Newsletter from "./Newsletter";
import Aos from "aos";

const Home = () => {
    useEffect(() => {
        Aos.refresh();
      });
  return (
    <div className="">
        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
             <Banner></Banner>
        </div>
        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
        <Section2></Section2>
        </div>
        <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
        <Section4></Section4>
        </div>
     
      
      
      <Section3></Section3>
      <Section5></Section5>
  
        <AppOfferSection></AppOfferSection>

      <Section6></Section6>
      <PromoCard></PromoCard>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
