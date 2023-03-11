import React from "react";
import "./Home.scss";
import { cards, projects } from "../../data";
import {
  Featured,
  TrustedBy,
  Slide,
  CatCard,
  ProjectCard,
  Features,
  Explore,
  Business,
  Footer,
} from "../../components";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <Features />
      {/* Next features or more whatever*/}
      <Explore />
      <Business />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
};
// Nav and Footer are from Layout Component
export default Home;
