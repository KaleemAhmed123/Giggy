import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil.js";
// Almost same as myGig Page

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest
        .get(`/orders`)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        }),
  });

  const handleConversation = async (order) => {
    const { sellerId, buyerId } = order;
    const conversationId = sellerId + buyerId;

    try {
      const individualConv = await newRequest.get(
        `/conversation/single/${conversationId}`
      );
    } catch (error) {
      // means first time our custom indicator 404
      if (error.response.status === 404) {
        const newConversation = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });

        // move to message page now
        navigate(`/message/${newConversation.data.roomId}`);
      } else next(error);
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    <img
                      // bcz we need buyer and seller id so (order)
                      onClick={() => handleConversation(order)}
                      className="message"
                      src="./img/message.png"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
