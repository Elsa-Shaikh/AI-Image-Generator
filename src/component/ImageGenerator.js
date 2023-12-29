import React, { useRef, useState } from "react";
import defaultImage from "../asset/wolf.jpg";

const ImageGenerator = () => {
  const [url, setURL] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  let api_key = process.env.API_KEY;

  const imageGenerate = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setURL(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={url === "/" ? defaultImage : url} alt="DefaultImage" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loadingBar"}></div>
          <div className={loading ? "loadingText" : "displayNone"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="searchBox">
        <input
          type="text"
          ref={inputRef}
          className="searchInput"
          placeholder="Describe What You Want To See"
        />
        <button
          type="button"
          className="generateBtn"
          onClick={() => {
            imageGenerate();
          }}
        >
          Generator
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
