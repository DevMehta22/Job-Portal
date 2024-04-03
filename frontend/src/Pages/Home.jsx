import React from "react";
import "./Styles/Home.css";
const Home = () => {
  const style = {
    marginTop: "15%",
    color: "white",
    fontFamily: "cursive",
    fontSize: "80px",
    textShadow: "0px 5px 10px #1ca7f8",
  };
  return (
    <>
      <div className="container">
        <h1>
          <center style={style}>Carrer Connect</center>
        </h1>
        <p>
          <center
            style={{
              color: "white",
              fontFamily: "fantasy",
              fontSize: "28px",
            }}
          >
            Career Connect: Where Opportunities Meet Ambitions,
            <br />
            Navigate Your Career Path!
          </center>
        </p>
      </div>
    </>
  );
};

export default Home;