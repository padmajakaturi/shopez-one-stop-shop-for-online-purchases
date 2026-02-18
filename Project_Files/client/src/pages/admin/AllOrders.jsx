import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/fetch-orders');
      setOrders(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await axios.put('/cancel-order', { id: id });
      alert("Order cancelled!");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Cancel failed");
    }
  };

  const updateOrderStatus = async (id) => {
    if (!updateStatus[id]) {
      alert("Select status first");
      return;
    }

    try {
      await axios.put('/update-order-status', {
        id: id,
        updateStatus: updateStatus[id],
      });
      alert("Status updated!");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="all-orders-page">
      <h3>Orders</h3>

      <div className="all-orders">
        {orders.map((order) => (
          <div className="all-orders-order" key={order._id}>
            <img src={order.mainImg} alt="" />

            <div className="all-orders-order-data">
              <h4>{order.title}</h4>
              <p>{order.description}</p>

              <p><b>Order status:</b> {order.orderStatus}</p>

              {/* Update status */}
              {(order.orderStatus !== 'delivered' &&
                order.orderStatus !== 'cancelled') && (
                <>
                  <select
                    className="form-select form-select-sm"
                    value={updateStatus[order._id] || ""}
                    onChange={(e) =>
                      setUpdateStatus({
                        ...updateStatus,
                        [order._id]: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Update order status
                    </option>
                    <option value="order placed">Order placed</option>
                    <option value="In-transit">In-transit</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => updateOrderStatus(order._id)}
                  >
                    Update
                  </button>
                </>
              )}

              {/* Cancel button */}
              {(order.orderStatus === 'order placed' ||
                order.orderStatus === 'In-transit') && (
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
