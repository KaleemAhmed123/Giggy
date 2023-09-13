import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil";

const Review = ({ review }) => {
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery({
    // must be unique
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {/* user-profile */}
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error"
      ) : (
        <div className="user">
          <img className="pic" src={userData.img || "/img/noavatar.jpg"} />
          <div className="info">
            <span>{userData.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{userData.country}</span>
            </div>
          </div>
        </div>
      )}
      {/* user-profile-end -> starts*/}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, idx) => {
            <img src="/img/star.png" alt="" />;
          })}
        <span>{review.start}</span>
      </div>
      {/* review-text */}
      <p>{review.desc}</p>
      {/* helpful-or-not-area */}
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
