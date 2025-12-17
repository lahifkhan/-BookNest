import React, { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

import DetailsTab from "./DetailsTab";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import Loader from "../../Components/Shared/Loader";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  console.log(user);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // single book info
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book/${id}`);
      return res.data;
    },
  });

  // fetch user's wishlist to check if book is already wishlisted
  useEffect(() => {
    if (user?.email && book?._id) {
      axiosSecure
        .get(`/wishlist/${user.email}`)
        .then((res) => {
          const exists = res.data.find((item) => item.bookId === book._id);
          setIsWishlisted(!!exists);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email, book?._id, axiosSecure]);

  // order mutation
  const orderMutation = useMutation({
    mutationFn: async (orderData) => {
      const res = await axiosSecure.post("/orders", orderData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Order placed successfully", "success");
      reset();
      modalRef.current.close();
    },
  });

  const handleOrderSubmit = (data) => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      price: book.price,
      librarianEmail: book.librarian,
      customerName: user.displayName,
      customerEmail: user.email,
      phone: data.phone,
      address: data.address,
      orderStatus: "pending",
      paymentStatus: "unpaid",
      orderDate: new Date(),
    };
    orderMutation.mutate(orderInfo);
  };

  // wishlist add/remove mutation
  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axiosSecure.delete(`/wishlist/${user.email}/${book._id}`);
        setIsWishlisted(false);
        Swal.fire("Removed!", "Book removed from wishlist", "success");
      } else {
        const wishlistInfo = {
          userEmail: user.email,
          bookId: book._id,
          bookName: book.bookName,
          bookImage: book.bookImage,
          price: book.price,
        };
        await axiosSecure.post("/wishlist", wishlistInfo);
        setIsWishlisted(true);
        Swal.fire("Added!", "Book added to wishlist", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="w-11/12 mx-auto p-6">
      {/* book info */}
      <div className="flex flex-col md:flex-row gap-10 bg-base-100 p-6 rounded-lg shadow-md">
        <div className="md:w-1/3 flex justify-center items-center">
          <img
            src={book.bookImage}
            alt={book.bookName}
            className="rounded-lg max-h-96 object-contain"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{book.bookName}</h1>
            <button onClick={toggleWishlist} className="text-2xl">
              {isWishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
          </div>

          <h2 className="text-lg text-accent">by {book.bookAuthor}</h2>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                className={`${
                  idx < book.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-accent">
              ({book.reviewCount || 0} reviews)
            </span>
          </div>

          <p className="text-2xl font-semibold text-green-600">${book.price}</p>

          <button
            onClick={() => modalRef.current.showModal()}
            className="btn btn-primary w-40 mt-4"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-10 bg-base-100 rounded-lg shadow-md">
        <DetailsTab book={book} />
      </div>

      {/* modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Place Your Order</h3>

          <form
            onSubmit={handleSubmit(handleOrderSubmit)}
            className="space-y-4"
          >
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Delivery Address"
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={orderMutation.isPending}
            >
              {orderMutation.isPending ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
