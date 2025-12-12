import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <Link to={`/book-details/${book._id}`}>
      <div className="card bg-base-100 shadow-sm hover:shadow-lg cursor-pointer transition h-[380px] w-full">
        {/* Fixed Image Area */}
        <figure className="h-48 bg-base-300 p-4 flex items-center justify-center">
          <img
            src={book.bookImage}
            alt={book.bookName}
            className="object-contain w-full h-full"
          />
        </figure>

        {/* Body Section with Fixed Height */}
        <div className="card-body space-y-2">
          {/* Book Name with line clamp */}
          <h2 className="card-title text-primary line-clamp-1">
            {book.bookName}
          </h2>

          {/* Author */}
          <p className="text-base-content line-clamp-1">
            Author: <span className="font-medium">{book.bookAuthor}</span>
          </p>

          {/* Price */}
          <p className="font-semibold text-primary mt-2">
            Price: ${book.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
