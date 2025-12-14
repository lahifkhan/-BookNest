import React from "react";
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";
import WhyChooseUs from "./WhyChoseUs/WhyChoseUs";
import Coverage from "./Coverage/Coverage";
import ClientTestimonial from "./Testimonial/ClientTestimonial";
import LatestBooks from "./LatestBooks/LatestBooks";

const Home = () => {
  return (
    <div className="">
      <div>
        <Banner></Banner>
      </div>
      <div className="">
        <Feature></Feature>
      </div>
      <LatestBooks></LatestBooks>
      <Coverage></Coverage>

      <WhyChooseUs></WhyChooseUs>

      <ClientTestimonial></ClientTestimonial>
    </div>
  );
};

export default Home;
