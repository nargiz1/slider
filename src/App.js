import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState();
  const [timer, setTimer] = useState();

  let time = new Date();

  useEffect(() => {
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        if (images.length < 5) {
          axios
            .get(
              "https://random.imagecdn.app/v1/image?category=nature&format=json"
            )
            .then((res) => {
              console.log("imgs", images);
              setImages([...images, res.data]);
              setCurrent(res.data);
            });
        } else {
          let index = images.indexOf(current);
          if (index >= 0 && index < images.length - 1) {
            setCurrent(images[index + 1]);
          } else {
            setCurrent(images[0]);
          }
        }
      }, 3000)
    );
  }, [images, current]);

  const nextImg = () => {
    let index = images.indexOf(current);
    if (index >= 0 && index < images.length - 1) {
      setCurrent(images[index + 1]);
    } else {
      setCurrent(images[0]);
    }
  };
  const prevImg = () => {
    let index = images.indexOf(current);
    if (index === 0) {
      setCurrent(images[images.length - 1]);
    } else {
      setCurrent(images[index - 1]);
    }
  };

  console.log(images, time.getSeconds());

  return (
    <>
      <div style={{ margin: "auto", width: "87%" }}>
        <span
          style={{ fontSize: "60px", cursor: "pointer" }}
          onClick={() => prevImg()}
        >
          {" "}
          {`<`}{" "}
        </span>
        <div
          style={{
            width: "1000px",
            height: "auto",
            paddingTop: "20px",
            display: "inline-block",
          }}
        >
          <img src={current?.url} style={{ width: "100%", height: "auto" }} />
        </div>
        <span
          style={{ fontSize: "60px", cursor: "pointer" }}
          onClick={() => nextImg()}
        >
          {" "}
          {`>`}{" "}
        </span>
      </div>
    </>
  );
}

export default App;
