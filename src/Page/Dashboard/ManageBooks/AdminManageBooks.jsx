import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AdminManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all books
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  // Publish / Unpublish
  const publishMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/admin/books/status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Updated!", "Book status updated", "success");
    },
  });

  // Delete book
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin/books/${id}`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Deleted!", "Book and related orders deleted", "success");
    },
  });

  const handlePublishToggle = (book) => {
    const newStatus = book.status === "published" ? "unpublished" : "published";

    publishMutation.mutate({
      id: book._id,
      status: newStatus,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-accent">Manage Books</h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Librarian</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.librarianEmail}</td>
                <td>${book.price}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="space-x-2">
                  <button
                    onClick={() => handlePublishToggle(book)}
                    className={`btn btn-sm ${
                      book.status === "published"
                        ? "btn-warning"
                        : "btn-success"
                    }`}
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <p className="text-center py-10 text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default AdminManageBooks;
