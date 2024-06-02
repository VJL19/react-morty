import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

const Random = ({ favChar, setFavChar }) => {
  const [setImage, setNewImage] = useState({
    setName: "",
    randomImage: "?",
    setId: 0,
  });

  const [setMeme, setAllMemes] = useState([]);
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  const randomPage = Math.floor(Math.random() * (44 + 1) - 1);
  const [page, setPage] = useState({
    setDefaultPage: `https://rickandmortyapi.com/api/character/?page=${0}`,
  });

  useEffect(() => {
    let charFound = favChar?.find((char) => char.id === info.id);

    if (charFound) {
      setText("Remove");
    } else {
      setText("Add");
    }
  }, [favChar]);

  useEffect(() => {
    let charFound = favChar?.find((char) => char.id === setImage.setId);

    if (charFound) {
      setText("Remove");
    } else {
      setText("Add");
    }
  }, [setImage.randomImage]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${randomPage}`)
      .then((res) => {
        setAllMemes(res.data.results);
      });
  }, [page.setDefaultPage]);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${setImage.setName}`
      )
      .then((res) => {
        const filter = res.data.results.filter((item) => {
          return setImage.setId === item.id;
        });
        filter.forEach((item) => setInfo(item));
        console.log("in use effect", filter);
      });
  }, [setImage.setName]);

  function handleClick() {
    const RandomNumber = Math.floor(Math.random() * setMeme.length);
    const newImage = setMeme[RandomNumber].image;
    const newName = setMeme[RandomNumber].name;
    const newId = setMeme[RandomNumber].id;

    setNewImage((prevMemeImage) => {
      return {
        randomImage: newImage,
        setName: newName,
        setId: newId,
      };
    });
    setPage((prevPage) => {
      return {
        setDefaultPage: `https://rickandmortyapi.com/api/character/?page=${randomPage}`,
      };
    });
  }

  const [button, setButton] = React.useState(false);

  function handleShow() {
    setButton(!button);
  }

  function handleFav() {
    let charFound = favChar?.find((char) => char.id === info.id);
    if (charFound) {
      setFavChar({
        type: "SET_FAVCHAR",
        payload: favChar?.filter((char) => char.id !== info.id),
      });
    } else {
      // setFavChar(favChar => [...favChar, info]);
      setFavChar({ type: "SET_FAVCHAR", payload: [...favChar, info] });
      alert("Succesfully added to your favorites!");
    }
  }

  return (
    <div className="random">
      {setImage.randomImage == "?" ? (
        <h1 className="random--text">?</h1>
      ) : (
        <div>
          <img src={setImage.randomImage} />
          <h1 className="char--name">{setImage.setName}</h1>
        </div>
      )}
      {!button ? (
        setImage.randomImage == "?" ? (
          <></>
        ) : (
          <>
            <button onClick={handleShow} className="btn-show">
              Show More
            </button>
            <button onClick={handleFav} className="btn-show">
              {text} to favorite
            </button>
          </>
        )
      ) : (
        ""
      )}

      {!button ? (
        <button onClick={handleClick} className="btn-char">
          Get a random character
        </button>
      ) : (
        <button onClick={handleShow}>{!button ? "Show" : "Hide"} More</button>
      )}

      {button ? (
        <ul className="infos">
          {info.key}
          <li>Species: {info.species}</li>
          <li>Gender: {info.gender}</li>
          <li>Status: {info.status}</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
export default Random;
