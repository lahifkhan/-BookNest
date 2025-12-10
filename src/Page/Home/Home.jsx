import React from "react";
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";
import WhyChooseUs from "./WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div className="">
      <div>
        <Banner></Banner>
      </div>
      <div className="">
        <Feature></Feature>
      </div>

      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
