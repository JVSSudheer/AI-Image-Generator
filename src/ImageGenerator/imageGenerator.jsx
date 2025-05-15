import { useRef, useState } from "react";
import "./imageGenerator.css";
import default_img from "./default.png";

const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const imageGenerator = async () => {
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
          Authorization: `Bearer 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`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImageUrl(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_img : image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Enter a prompt"
        />
        <div className="generate-btn" onClick={() => imageGenerator()}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
