import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Pay.scss";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/axiosUtil.js";
// stripe says outside the comp so (pubKey no need to hide)
const stripePromise = loadStripe(
  "pk_test_51Mp7fdSGxttXvUMBOu4Ra28CCZKsROOBMi04EIt7k2SPdngEjz6tKYsUcsA2lbOJXOFD5OEc7oh2BJx8FPqZ4TWj00e3BXV09s"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const makeRequest = async () => {
      try {
        const result = newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(result.data.clientSecret);
        // stripe checks client secret if everythink OK redirects to input form
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
