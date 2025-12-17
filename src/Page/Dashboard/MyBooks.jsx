import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myBooks = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-books/${user.email}`);
      return res.data;
    },
  });

  // Handle publish / unpublish
  const handleStatusUpdate = async (id, currentStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        currentStatus === "published"
          ? "This will unpublish the book."
          : "This will publish the book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        currentStatus === "published" ? "Yes, unpublish" : "Yes, publish",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newStatus =
          currentStatus === "published" ? "unpublished" : "published";

        const res = await axiosSecure.patch(`/update-book-status/${id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Book status updated.", "success");
          refetch();
        }
      }
    });
  };

  if (isPending) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">📚 My Books</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-lg font-semibold text-accent">
              <th>#</th>
              <th>Book</th>
              <th>Status</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myBooks.map((book, index) => (
              <tr key={book._id}>
                <td className="text-accent">{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-bold text-accent">{book.bookName}</p>
                      <p className="text-sm text-gray-500">
                        by {book.bookAuthor}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span className="font-semibold text-accent">
                    {book.status}
                  </span>
                </td>

                {/* price */}
                <td className="font-semibold text-accent">${book.price}</td>

                {/* edit  */}
                <td>
                  <Link
                    to={`/dashboard/edit-book/${book._id}`}
                    className="btn btn-sm btn-info text-white"
                  >
                    Edit
                  </Link>
                </td>

                {/* publish / unpublish */}
                <td>
                  <button
                    onClick={() => handleStatusUpdate(book._id, book.status)}
                    className="btn btn-sm btn-error text-white"
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-5">No books added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
