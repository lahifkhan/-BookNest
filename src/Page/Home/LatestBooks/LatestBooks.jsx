import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import BookCard from "../../../Components/Book/BookCard";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books/latest?status=published");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto my-16">
      <div className="text-center mb-10">
        <p className="text-secondary font-bold text-lg">Our Collection</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Latest Books
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Discover the newest published books from our library. Explore and grab
          your favorite ones!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard book={book} key={book._id}></BookCard>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No published books available
        </p>
      )}
    </section>
  );
};

export default LatestBooks;
