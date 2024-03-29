import React, { useState } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const [errorText, setErrorText] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    // review { gigId, desc, star } passed by mutate method
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      // invalidate add our our data in reviews and refetches
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      setErrorText(err?.response?.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    mutation.mutate({ gigId, desc, star });
    setErrorText(""); // Clear any previous error message
  };

  // console.log(errorText);

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          {errorText && <p className="error">{errorText}</p>}
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
