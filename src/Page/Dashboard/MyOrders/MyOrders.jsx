import { useQuery, useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // fetch orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/orders/cancel/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Cancelled!", "Order has been cancelled", "success");
      refetch();
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  const handlePayment = async (order) => {
    const paymentInfo = {
      orderId: order._id,
      bookName: order.bookName,
      bookId: order.bookId,
      customerEmail: order.customerEmail,
      price: order.price,
      librarianEmail: order.librarianEmail,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data);

    window.location.href = res.data.url;
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-accent font-bold mb-6">My Orders</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="font-medium">{order.bookName}</td>

                <td>{new Date(order.orderDate).toLocaleDateString()}</td>

                <td>
                  <span>{order.orderStatus}</span>
                </td>

                <td>
                  <span>{order.paymentStatus}</span>
                </td>

                <td className="space-x-2">
                  {/* Cancel Button */}
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay Now Button */}
                  {order.orderStatus === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePayment(order)}
                        className="btn btn-sm btn-primary"
                      >
                        Pay Now
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            You have not ordered any books yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
