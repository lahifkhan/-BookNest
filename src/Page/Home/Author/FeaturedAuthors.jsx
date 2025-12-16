import Marquee from "react-fast-marquee";
import { FaBook } from "react-icons/fa";
import laurelImg from "../../../assets/laurel.jpg";

const FeaturedAuthors = () => {
  const authors = [
    {
      id: 1,
      name: "Leslie Alexander",
      books: 5,
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      books: 12,
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Esther Howard",
      books: 10,
      img: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Shikhon Islam",
      books: 7,
      img: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Kawser Ahmed",
      books: 4,
      img: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Brooklyn Simmons",
      books: 15,
      img: "https://i.pravatar.cc/150?img=6",
    },
  ];

  return (
    <section className="py-16 bg-base-100 w-11/12 mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Featured Author</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Discover popular authors and explore their published works
        </p>
      </div>

      {/* Marquee */}
      <Marquee
        speed={50}
        pauseOnHover={true}
        direction="right"
        gradient={true}
        gradientColor={[245, 245, 245]}
      >
        {authors.map((author) => (
          <div key={author.id} className="mx-4">
            <div className="card w-60 bg-base-100 shadow-md hover:shadow-xl transition">
              <div className="card-body items-center text-center">
                <div className="relative w-35 h-35 flex items-center justify-center">
                  <img
                    src={laurelImg}
                    alt="laurel"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Author Image */}
                  <img
                    src={author.img}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover z-10
                               border-2 border-warning bg-white"
                  />
                </div>

                {/* Author Info */}
                <h2 className="card-title text-base mt-3">{author.name}</h2>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaBook className="text-warning" />
                  {author.books} Published Books
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default FeaturedAuthors;
