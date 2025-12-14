import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch wishlist
  const {
    data: wishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Remove from wishlist
  const handleRemove = async (bookId) => {
    try {
      const result = await axiosSecure.delete(
        `/wishlist/${user.email}/${bookId}`
      );
      if (result.data.success) {
        Swal.fire("Removed!", "Book removed from wishlist", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to remove book", "error");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading wishlist...</p>;

  if (!wishlist.length)
    return (
      <p className="text-center mt-10 text-accent">
        No books in your wishlist yet.
      </p>
    );

  return (
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Wishlist</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, index) => (
              <tr key={item.bookId}>
                <td>{index + 1}</td>
                <td className="flex items-center gap-4">
                  <img
                    src={item.bookImage}
                    alt={item.bookName}
                    className="w-16 h-20 object-contain rounded-md"
                  />
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate(`/book-details/${item.bookId}`)}
                  >
                    {item.bookName}
                  </span>
                </td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleRemove(item.bookId)}
                    className="btn btn-sm btn-error flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
