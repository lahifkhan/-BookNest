import { FaTruck, FaLock, FaHeadset, FaTag } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Return & Refund",
    desc: "Money back guarantee",
    icon: <FaTruck className="text-white text-2xl" />,
  },
  {
    id: 2,
    title: "Secure Payment",
    desc: "30% off by subscribing",
    icon: <FaLock className="text-white text-2xl" />,
  },
  {
    id: 3,
    title: "Quality Support",
    desc: "Always online 24/7",
    icon: <FaHeadset className="text-white text-2xl" />,
  },
  {
    id: 4,
    title: "Daily Offers",
    desc: "20% off by subscribing",
    icon: <FaTag className="text-white text-2xl" />,
  },
];

const Feature = () => {
  return (
    <section className="mt-16 w-11/12 mx-auto">
      <p className=" text-primary font-bold text-xl mb-2">
        Features of BookNest
      </p>

      <div className=" bg-[#D0E1E7] rounded-xl py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center space-x-4 justify-center"
            >
              {/* Icon Box */}
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary">
                {feature.icon}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
