import React, { useState } from "react";
import "../styles/global.css";

const Favorite = ({
  id,
  name,
  image,
  species,
  gender,
  status,
  setFavChar,
  favChar,
}) => {
  const [infos, setInfos] = useState(false);

  const handleShow = () => {
    setInfos((prevInfo) => !prevInfo);
  };

  const removeFav = (id) => {
    // let charFound = false;
    // const conf = window.confirm('Are you sure ? removing this character from your favorite?');
    // if(conf){
    //     localStorage.removeItem(name);
    // }

    // favChar.forEach((char) => {
    //     if(char.name == name){
    //         const conf = window.confirm('Are you sure ? removing this character from your favorite?');
    //     if(conf){
    //         localStorage.removeItem('char');
    //         console.log("Executed", char)
    //     }
    //     }
    // })
    console.log(name);

    setFavChar({
      type: "SET_FAVCHAR",
      payload: favChar.filter((char) => char.id !== id),
    });
    // prev => prev.filter(char => char.id !== id))
    // setFavChar((prev) => [...prev].slice(0, -1))
  };
  return (
    <div className="homepage--content">
      <img src={image} alt="a character profile" loading="lazy" />
      <h1>{name}</h1>
      <button type="button" className="showmore" onClick={handleShow}>
        {!infos ? "Show" : "Hide"} More
      </button>
      <button type="button" className="removeFav" onClick={() => removeFav(id)}>
        Remove as Favorite
      </button>

      {infos ? (
        <ul className="infos">
          <li>Species: {species}</li>
          <li>Gender: {gender}</li>
          <li>Status: {status}</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
export default Favorite;
