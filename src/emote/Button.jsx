import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Button.scss";
import { config } from "../../config.js";
const { apiDomain, emotePath } = config;

export default function Button({
  name = "unknown",
  talkId = "unknown",
  count: initialCount = 0,
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const formattedCount =
    count < 1000 ? count : `${(count / 1000).toFixed(1)}k`.replace(".0k", "k");

  const handleClick = () => {
    fetch(`${apiDomain}${emotePath}/${talkId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emote: name }),
    }).then(() => {
      setCount((prevCount) => prevCount + 1);
    });
  };

  return (
    <div className="button">
      <button onClick={handleClick} className={name}></button>
      <p>{formattedCount}</p>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  talkId: PropTypes.string,
  count: PropTypes.number,
};
