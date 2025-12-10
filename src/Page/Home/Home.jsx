import React from "react";
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";
import WhyChooseUs from "./WhyChoseUs/WhyChoseUs";
import Coverage from "./Coverage/Coverage";
import ClientTestimonial from "./Testimonial/ClientTestimonial";

const Home = () => {
  return (
    <div className="">
      <div>
        <Banner></Banner>
      </div>
      <div className="">
        <Feature></Feature>
      </div>
      <Coverage></Coverage>

      <WhyChooseUs></WhyChooseUs>

      <ClientTestimonial></ClientTestimonial>
    </div>
  );
};

export default Home;
