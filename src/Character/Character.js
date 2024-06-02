import React, { useEffect, useState } from "react";

const Character = ({
  name,
  image,
  infos,
  data,
  favChar,
  setFavChar,
  species,
  gender,
  status,
  viewChar,
  id,
}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Add");
  const [color, setColor] = useState("#0d6efd");

  useEffect(() => {
    let charFound = favChar?.find((char) => char.id === id);

    if (charFound) {
      setText("Remove");
      setColor("red");
    } else {
      setText("Add");
      setColor("#0d6efd");
    }
  }, [favChar, id]);

  const handlePrev = () => {
    let charFound = favChar?.find((char) => char.id === id);

    if (charFound) {
      setFavChar({
        type: "SET_FAVCHAR",
        payload: favChar.filter((char) => char.id !== id),
      });
    } else {
      setFavChar({
        type: "SET_FAVCHAR",
        payload: [...favChar, viewChar],
      });

      alert("Successfully added to your favorites!");
    }
  };
  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <main className="homepage">
        <li className="homepage--content">
          <img src={image} alt="a character img" loading="lazy" />
          <h2>{name}</h2>
          {infos}
          {data}

          {show ? (
            <>
              <ul className="infos">
                <li>Species: {species}</li>
                <li>Gender: {gender}</li>
                <li>Status: {status}</li>
              </ul>
              <button type="button" className="showmore" onClick={handleShow}>
                Hide Details
              </button>
            </>
          ) : (
            <>
              <button type="button" className="showmore" onClick={handleShow}>
                Show More
              </button>
              <br />
              <button
                style={{ backgroundColor: color }}
                type="button"
                className="showmore"
                onClick={(character) => handlePrev()}
              >
                {text} to favorites
              </button>
            </>
          )}
        </li>
      </main>
    </div>
  );
};
export default Character;
