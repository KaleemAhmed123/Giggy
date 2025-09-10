import React from "react";
import "./Gig.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/axiosUtil.js";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();
  // console.log(id);

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    // now queryFn will run when we get the userId
    enabled: !!userId,
  });

  function handleContactClick(phoneNumber) {
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  }

  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            {/* upper scene */}
            <span className="breadcrumbs">
              Liverr &gt; Graphics & Design &gt;
            </span>
            <h1>{data.title}</h1>
            {/* image-name-star */}
            {isLoadingUser ? (
              "Loading User"
            ) : errorUser ? (
              "Something went wrong."
            ) : (
              <div className="user">
                <img
                  className="pic"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {/* image-slider */}
            {data.images && data.images.length > 0 ? (
              <Slider
                slidesToShow={1}
                slidesToScroll={1}
                arrows
                className="slider"
                dots={false}
                infinite={false}
              >
                {data.images?.map((img) => (
                  <img key={img} src={img} alt="" />
                ))}
              </Slider>
            ) : (
              <p>No images available</p>
            )}
            {/* About gig */}
            <h2>About This Gig</h2>
            <p>{data.desc}</p>

            {/* seller area */}
            {isLoadingUser ? (
              "Loading User"
            ) : errorUser ? (
              "Something went wrong."
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                {/* user=> image-name-star-contactButton */}
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button onClick={() => handleContactClick(data.phone)}>
                      Contact Me
                    </button>
                  </div>
                </div>

                {/* about user box => From-since-avg-last-lang-hr-desc */}
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {new Date(dataUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">4 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
                {/* box end --- */}
              </div>
            )}
            {/* id by useParam */}
            <Reviews gigId={id} />
            {/* ============== */}
          </div>
          {/* left-end */}
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="clock-img" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="recycle-icon" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features?.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Click to puchase</button>
            </Link>
          </div>
          {/* right-end */}
        </div>
      )}
      {/* container-end */}
    </div>
  );
}

export default Gig;
