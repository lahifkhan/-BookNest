import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const LibrarianOrders = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();

  // Fetch all orders for librarian books
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarianOrders", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian/orders/${user.email}`);
      return res.data;
    },
  });

  // Update Order Status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/librian/update-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Updated!", "Order status updated successfully", "success");
    },
  });

  // Cancel Order
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/librian/update-status/${id}`, {
        status: "cancelled",
      });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Cancelled!", "Order has been cancelled", "success");
    },
  });

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

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

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6">Orders</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>User</th>
              <th>Order Date</th>
              <th>Payment</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="font-medium">{order.bookName}</td>

                <td>{order.customerEmail}</td>

                <td>{new Date(order.orderDate).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`badge ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* ORDER STATUS */}
                <td>
                  {order.orderStatus === "cancelled" && (
                    <span className="badge badge-error">Cancelled</span>
                  )}

                  {order.orderStatus === "delivered" && (
                    <span className="badge badge-success">Delivered</span>
                  )}

                  {(order.orderStatus === "pending" ||
                    order.orderStatus === "shipped") && (
                    <select
                      className="select select-sm select-bordered"
                      value={order.orderStatus} // <-- use value instead of defaultValue
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  )}
                </td>

                {/* ACTION */}
                <td>
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10 text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default LibrarianOrders;
