import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil";

const GigCard = ({ item }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest
        .get(`/users/${item.userId}`)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        }),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        {/* 50% area image */}
        <img src={item.cover} alt="gig-image" />
        {/* 50% info and detail */}
        <div className="info">
          {isLoading ? (
            "Loading.."
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(Math.round(item.totalStars / item.starNumber)) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        {/*  */}
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
        {/*  */}
      </div>
    </Link>
  );
};

export default GigCard;
