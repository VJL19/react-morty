import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";
import "./styles/global.css";
import Random from "./Random";
import Other from "./Others";
import Favorite from "./Favorite";
import Character from "./Character";
import Nav from "./Nav";
import Homepage from "./Homepage";
// const Homepage = React.lazy(() => import("./Homepage"));

export default function App() {
  const retrievedFavChar = JSON.parse(localStorage.getItem("favChar")) || [];
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const reducerFn = (state, action) => {
    const { payload, type } = action;

    switch (type) {
      case "SET_PAGE":
        return { ...state, pageNum: payload };
      case "SET_INFO":
        return { ...state, infos: payload };
      case "SET_CHARACTER":
        return { ...state, character: payload };
      case "SET_ITEMS":
        return { ...state, items: payload };
      case "SET_FAVCHAR":
        return { ...state, favChar: payload };
      default:
        throw new Error();
    }
  };

  const initialState = {
    pageNum: 1,
    infos: false,
    character: {},
    items: [],
    favChar: retrievedFavChar,
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  let API_URL = `https://rickandmortyapi.com/api/character?page=${state.pageNum}`;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(API_URL)
        .then((res) =>
          dispatch({ type: "SET_ITEMS", payload: res.data.results })
        )
        .catch((err) => console.log(err))

        .finally(() => setLoading(false));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [API_URL]);

  useEffect(() => {
    localStorage.setItem("favChar", JSON.stringify(state.favChar));
  }, [state.favChar]);

  const handleClick = (item) => {
    dispatch({ type: "SET_CHARACTER", payload: item });

    dispatch({ type: "SET_INFO", payload: !state.infos });
  };

  const handleNext = (evt) => {
    dispatch({ type: "SET_PAGE", payload: state.pageNum + 1 });
    setLoading(false);
    // setPagenum((prev) => prev + 1)
  };

  const getFavChar = state.favChar.map((char) => {
    return (
      <Favorite
        {...char}
        favChar={state.favChar}
        setFavChar={dispatch}
        items={state.items}
      />
    );
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const displayChar = (
    <>
      {loading && <h1>Loading</h1>}

      {!loading && (
        <>
          <div style={{ display: "block", width: "100%" }}>
            <input
              value={search}
              type="search"
              placeholder="Enter character name"
              onChange={(e) => handleSearch(e)}
            />
            <h1>You are at page {state.pageNum} out of 42</h1>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </div>
          {state.items
            .filter((item) =>
              item.name.toLowerCase().includes(search) ? item : ""
            )
            .map((item) => (
              <Homepage
                {...item}
                infos={
                  <NavLink to={`/character/${item.id}`}>
                    <div className="btnContainer">
                      <button
                        type="button"
                        className="showmore"
                        onClick={() => handleClick(item)}
                      >
                        Show More
                      </button>
                    </div>
                  </NavLink>
                }
              />
            ))}
        </>
      )}
    </>
  );

  const { character } = state;
  const displayCharInfo = (
    <Character
      {...character}
      setFavChar={dispatch}
      favChar={state.favChar}
      viewChar={character}
    ></Character>
  );

  return (
    <>
      <Nav />
      <div className="main--container">
        <Routes>
          <Route path="" element={displayChar}></Route>
          {state.items.map((item) => (
            <Route
              key={item.id}
              path={`character/${item.id}`}
              element={displayCharInfo}
            ></Route>
          ))}
          <Route path="favorite" element={getFavChar}></Route>
          <Route
            path="random"
            element={<Random favChar={state.favChar} setFavChar={dispatch} />}
          ></Route>
          <Route path="other" element={<Other />}></Route>
        </Routes>
      </div>
    </>
  );
}
