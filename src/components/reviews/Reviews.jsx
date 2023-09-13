import React from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => {
      newRequest
        .get(`reviews/${gigId}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading"
        : error
        ? "Something went wrong"
        : data.map((review) => {
            <Review review={review} key={review._id} />;
          })}

      {/* review-end */}
    </div>
  );
};

export default Reviews;
