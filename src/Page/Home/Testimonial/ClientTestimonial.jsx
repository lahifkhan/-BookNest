import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    text: "This book delivers a clear reminder that growth begins with choosing perspective. It encourages seeing opportunities instead of limitations, making personal development feel truly achievable.",
    name: "Ronald Richards",
    title: "Marketing Coordinator",
    img: "https://i.pravatar.cc/100?img=12",
    rating: 3,
    logo: "https://seeklogo.com/images/E/envato-logo-157A5D063E-seeklogo.com.png",
  },
  {
    id: 2,
    text: "This platform provides a refreshing experience with thoughtful design and seamless features. It helps you stay focused, organized, and inspired, making daily productivity noticeably easier.",
    name: "Wade Warren",
    title: "Product Strategist",
    img: "https://i.pravatar.cc/100?img=20",
    rating: 4,
    logo: "https://seeklogo.com/images/E/envato-logo-157A5D063E-seeklogo.com.png",
  },
  {
    id: 3,
    text: "The service stands out with its attention to detail and user-centered approach. Every interaction feels polished, reliable, and meaningful, making it incredibly easy to trust and recommend.",
    name: "Leslie Alexander",
    title: "Creative Director",
    img: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    logo: "https://seeklogo.com/images/E/envato-logo-157A5D063E-seeklogo.com.png",
  },
];

const ClientTestimonial = () => {
  return (
    <div className="py-12 w-11/12 mx-auto  ">
      {/* Section Title */}
      <div className="text-center">
        <p className="text-secondary font-bold text-xl mb-2">
          What Our Clients Say
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-6 text-primary">
          Trusted by Readers Across the Country
        </h2>

        <p className="text-accent mb-8 max-w-xl mx-auto">
          Real experiences from real customers who rely on BookNest for fast,
          reliable, and stress-free book delivery every time.
        </p>
      </div>

      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="space-x-6 p-3"
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="relative bg-base-100 w-96 p-6 rounded-xl shadow-xl   mx-4"
          >
            {/* Accent Triangle */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[80px] border-l-primary border-t-[80px] border-t-transparent rounded-bl-xl"></div>

            {/* Top Text */}
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 relative z-10">
              {item.text}
            </p>

            {/* Bottom Section */}
            <div className="flex justify-between items-center relative z-10">
              {/* Left: Profile */}
              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow"
                />

                <div>
                  <h4 className="font-semibold text-primary">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  {/* Rating */}
                  <div className="flex text-orange-400 mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {[...Array(5 - item.rating)].map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientTestimonial;
