import React from "react";
import "../styles/global.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div className="nav--main">
        <nav className="nav--container">
          <div className="nav--left">
            <img
              src={require("../images/rick-and-morty-wazzaldorp-deviantart-34.png")}
              height="60"
              alt="rick and morty logo"
              className="nav--logo"
            />
            <h1>React and Morty</h1>
          </div>

          <div className="morty-nav">
            <ul>
              <li>
                <NavLink to="" className="link--home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="favorite" className="link--fav">
                  Favorites
                </NavLink>
              </li>
              <li>
                <NavLink to="random" className="link--random">
                  Random Character
                </NavLink>
              </li>
              <li>
                <NavLink to="other" className="link--other">
                  Other
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Nav;
