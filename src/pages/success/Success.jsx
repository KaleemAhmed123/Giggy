import React, { useEffect } from "react";
import "./Success.scss";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/axiosUtil.js";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success-container">
      <div className="success-icon">&#10004;</div>
      <h1 className="success-heading">Payment Successful</h1>
      <p className="success-message">Thank you for your payment.</p>
      <p className="success-message">
        Payment successful. You are being redirected to the orders page.
      </p>
      <div className="success-message focus">Please do not close the page</div>
    </div>
  );
};

export default Success;
