import React, { Suspense } from "react";

const Homepage = (props) => {
  return (
    <div>
      <main className="homepage">
        <li className="homepage--content">
          <img src={props.image} alt="a character profile"></img>
          <h2>{props.name}</h2>
          {props.infos}
        </li>
      </main>
    </div>
  );
};
export default Homepage;
