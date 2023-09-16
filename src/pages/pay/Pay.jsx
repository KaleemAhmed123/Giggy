import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/axiosUtil.js";
import { useParams } from "react-router-dom";
import StripeForm from "../../components/stripeForm/StripeForm";

const stripePromise = loadStripe(
  "pk_test_51Mp7fdSGxttXvUMBOu4Ra28CCZKsROOBMi04EIt7k2SPdngEjz6tKYsUcsA2lbOJXOFD5OEc7oh2BJx8FPqZ4TWj00e3BXV09s"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
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
          <StripeForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
