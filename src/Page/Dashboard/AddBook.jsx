import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    console.log("Submitted Book:", data);
    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(imgURL, formData);

      const photoURL = imgRes?.data?.data?.display_url;

      // Prepare book object
      const bookData = {
        bookName: data.name,
        bookAuthor: data.author,
        price: data.price,
        status: data.status,
        description: data.description,
        bookImage: photoURL,
        librarian: user.email,
      };

      Swal.fire({
        title: "Confirm Adding Book",
        html: `
    You are about to add the following book:<br/>
    <strong>${bookData.bookName}</strong> by <strong>${bookData.bookAuthor}</strong>.<br/>
    The price will be <strong>${bookData.price} BDT</strong>.<br/>
    Please confirm to proceed with saving this book to the database.
  `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add Book",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // save the book info to the database
          axiosSecure.post("/books", bookData).then((res) => {
            console.log("after saving book", res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Book "${bookData.bookName}" has been added successfully!`,
                showConfirmButton: false,
                timer: 2500,
              });
              reset();
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* book Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Book Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter book title"
            className="input input-bordered w-full"
            {...register("name", { required: "Book name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* author */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Author</span>
          </label>
          <input
            type="text"
            placeholder="Author name"
            className="input input-bordered w-full"
            {...register("author", { required: "Author name is required" })}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* price */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Price</span>
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="input input-bordered w-full"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("status", { required: true })}
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Image */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Book Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: "Book image is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            placeholder="Write a short description..."
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
