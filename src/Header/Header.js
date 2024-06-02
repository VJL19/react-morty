import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <footer class="main--footer">
        <nav>
          <ul className="navigations">
            <NavLink to="" className="link--home">
              Homepage
            </NavLink>
            <NavLink to="favorite" className="link--favorite">
              Favorite
            </NavLink>
            <NavLink to="random" className="link--random">
              Random
            </NavLink>
            <NavLink to="other" className="link--other">
              Other
            </NavLink>
          </ul>
        </nav>
      </footer>
    </div>
  );
};
export default Header;
