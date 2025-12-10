import React from "react";
import { FaShieldAlt, FaTruck, FaBoxOpen, FaClock } from "react-icons/fa";
import Lottie from "lottie-react";
import courier from "../../../assets/Courier (1).json";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaTruck className="text-3xl text-primary" />,
      title: "Fast Delivery",
      desc: "We ensure quick and efficient delivery right to your doorstep.",
    },

    {
      icon: <FaBoxOpen className="text-3xl text-primary" />,
      title: "Quality Packaging",
      desc: "Every order is packaged with high-quality materials.",
    },
    {
      icon: <FaClock className="text-3xl text-primary" />,
      title: "On-Time Service",
      desc: "We take deadlines seriously and deliver on schedule.",
    },
  ];

  return (
    <section className="px-4 md:px-16 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12">
        {/* LEFT: Lottie Animation */}
        <div className="flex justify-center">
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
            {/* Lottie */}
            <div className="flex items-center justify-center w-full h-full bg-base-100 shadow-md rounded-3xl p-4">
              <Lottie animationData={courier} loop={true} />
            </div>
          </div>
        </div>

        {/* RIGHT: Features & Text */}
        <div>
          {/* Section Title */}
          <p className="text-primary font-bold text-xl mb-2">
            Why Choose BookNest?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-6 text-primary">
            We Deliver Trust With Every Order
          </h2>
          <p className="text-accent mb-8 max-w-xl">
            BookCourier is committed to providing reliable, safe, and efficient
            delivery services so that your reading experience is always
            seamless.
          </p>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="p-4 rounded-lg bg-primary/10 mr-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-primary">
                    {item.title}
                  </h4>
                  <p className="text-accent text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
