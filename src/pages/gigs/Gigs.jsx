import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Gigs.scss";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/axiosUtil.js";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const minRef = useRef(); // for vmap
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sortBy=${sort}`
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        }),
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  console.log(data);
  // console.log(error);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        {/* upper scene */}
        <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        {/*  menu */}
        <div className="menu">
          {/* Left start */}
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          {/* right start */}
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("price")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
          {/* right end */}
        </div>
        {/* Card gallery */}
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong."
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
        {/* gallery div end */}
      </div>
    </div>
  );
}

export default Gigs;
