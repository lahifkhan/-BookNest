import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const BannerSlider = () => {
  // ==== Only Title, Description & Image ====
  const books = [
    {
      id: 1,
      name: "Atomic Habits",
      img: "https://i.postimg.cc/TwsktnBP/15108516-M.jpg",
      desc: "Transform your life with tiny habits that compound over time.",
    },
    {
      id: 2,
      name: "Deep Work",
      img: "https://i.postimg.cc/ZqLy5jVC/14859612-M.jpg",
      desc: "Master the ability to focus without distractions and achieve more.",
    },
    {
      id: 3,
      name: "The Psychology of Money",
      img: "https://i.postimg.cc/SxkgT1XH/0011526178-M.jpg",
      desc: "Learn the timeless rules of wealth, happiness, and human behavior.",
    },
  ];

  return (
    <div className=" w-10/12 mx-auto  rounded-2xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-2xl "
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="flex flex-col md:flex-row justify-between items-center  p-6 md:p-10 ">
              {/* LEFT SIDE - TEXT */}
              <div className="md:w-1/2 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-primary">
                  {book.name}
                </h1>

                <p className="text-gray-600 text-lg">{book.desc}</p>

                <Link to="/all-books">
                  <button className="px-6 btn  py-3 btn-secondary text-base-100 rounded-lg font-semibold transition">
                    View All Books
                  </button>
                </Link>
              </div>

              <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                <div className="p-10 bg-gray-100 rounded-xl shadow-md">
                  <img
                    src={book.img}
                    alt={book.name}
                    className=" object-contain rounded-xl rotate-x-5 -rotate-y-20"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
