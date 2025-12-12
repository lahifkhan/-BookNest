import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import React from "react";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: book = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationKey: ["book", id],
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/update-book/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Book updated successfully", "success");
      refetch();
      navigate("/dashboard/librarian/my-books");
    },
  });

  const handleEditBook = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBook = {
      bookName: form.bookName.value,
      bookAuthor: form.bookAuthor.value,
      price: form.price.value,
      description: form.description.value,
      bookImage: form.bookImage.value,
    };

    mutation.mutate(updatedBook);
  };

  if (isPending) {
    return <p>loadin....</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-5"> Edit Book</h2>

      <form onSubmit={handleEditBook} className="space-y-4">
        {/* book Name */}
        <div>
          <label className="font-medium">Book Name</label>
          <input
            type="text"
            name="bookName"
            defaultValue={book.bookName}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* author name */}
        <div>
          <label className="font-medium">Author</label>
          <input
            type="text"
            name="bookAuthor"
            defaultValue={book.bookAuthor}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* price of book */}
        <div>
          <label className="font-medium">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={book.price}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* image */}
        <div>
          <label className="font-medium">Book Image URL</label>
          <input
            type="text"
            name="bookImage"
            defaultValue={book.bookImage}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={book.description}
            required
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
        </div>

        <button className="btn btn-primary w-full">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
