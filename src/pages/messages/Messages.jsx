import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Messages.scss";
import moment from "moment/moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil.js";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      // You can't directly access 'id' here, so you need to modify the code accordingly.
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // for that perticular conv mark both true rem
  const handleMarkAsRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading.."
      ) : error ? (
        "Something went wrong."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            {/* tHead */}
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* tbody */}
            <tbody>
              {/* messages */}
              {data.map((conversation) => (
                <tr
                  className={
                    (currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer)
                      ? "active"
                      : ""
                  }
                  key={conversation._id}
                >
                  <td>
                    {currentUser.isSeller
                      ? conversation.buyerId
                      : conversation.sellerId}
                  </td>
                  <td>
                    <Link
                      to={`/message/${conversation.roomId}`}
                      className="link"
                    >
                      {conversation?.lastMessage?.substr(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer) ? (
                      <button
                        onClick={() => handleMarkAsRead(conversation.roomId)}
                      >
                        Mark as Read
                      </button>
                    ) : null}
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

export default Messages;
