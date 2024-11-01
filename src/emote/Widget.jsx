import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Animation from "./animation/animation.js";
import { config } from "../../config.js";
import "./Widget.scss";

const { apiDomain, ssePath, emotePath } = config;

const Widget = ({ talkId, open }) => {
  const [showWidget, setShowWidget] = useState(open);
  const [showOptions, setShowOptions] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [selectedOption, setSelectedOption] = useState(true);
  const [buttonsData, setButtonsData] = useState([
    { name: "celebrate", emoji: "🎉", count: 0 },
    { name: "heart", emoji: "♥️", count: 0 },
    { name: "smile", emoji: "😊", count: 0 },
    { name: "clap", emoji: "👏", count: 0 },
    { name: "plusone", emoji: "👍", count: 0 },
    { name: "question", emoji: "❓", count: 0 },
    { name: "dolphin", emoji: "🐬", count: 0 },
  ]);

  const eventSourceRef = useRef(null);
  const animationRef = useRef(null);

  const fetchInitialVotes = useCallback(async () => {
    try {
      const response = await fetch(`${apiDomain}${emotePath}/${talkId}`);
      const counts = await response.json();
      setButtonsData((prevData) =>
        prevData.map((button) => ({
          ...button,
          count: counts[button.name] || 0,
        }))
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [talkId]);

  const voteReceived = useCallback((event) => {
    const votes = JSON.parse(event.data);
    setButtonsData((prevData) =>
      prevData.map((button) => ({
        ...button,
        count: votes[button.name] || button.count,
      }))
    );
  }, []);

  const emoteReceived = useCallback(
    (event) => {
      if (showAnimations) {
        animationRef.current?.fireAnimation(event.data);
      }
    },
    [showAnimations]
  );

  const cleanUp = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.removeEventListener("emote", emoteReceived);
      eventSourceRef.current.removeEventListener("votes", voteReceived);
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, [emoteReceived, voteReceived]);

  useEffect(() => {
    if (talkId) {
      if (eventSourceRef.current) {
        cleanUp();
      }
      eventSourceRef.current = new EventSource(
        `${apiDomain}${ssePath}/${talkId}`
      );
      eventSourceRef.current.addEventListener("votes", voteReceived); 
      eventSourceRef.current.addEventListener("emote", emoteReceived); 
      fetchInitialVotes();
      return () => {
        cleanUp();
      };
    }
  }, [talkId, fetchInitialVotes, emoteReceived, voteReceived, cleanUp]);

  useEffect(() => {
    if (!animationRef.current) {
      const canvasEl = document.querySelector(".animation-canvas");
      animationRef.current = new Animation(canvasEl);
    }
  }, []);

  const openOptions = () => {
    setShowOptions(true);
    setShowWidget(false);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setShowWidget(true);
  };

  const saveOptions = () => {
    setShowAnimations(selectedOption);
    closeOptions();
  };

  const toggleWidget = () => {
    if (showOptions) {
      setShowOptions(false);
      setShowWidget(false);
    } else {
      setShowWidget(!showWidget);
    }
  };

  return (
    <div className="container">
      {showWidget || showOptions ? (
        <div className="speech-bubble">
          {showWidget && (
            <>
              <h1>Share how you feel!</h1>
              <div className="buttons">
                {buttonsData.map((button) => (
                  <Button
                    key={button.name}
                    name={button.name}
                    talkId={talkId}
                    count={+button.count}
                  />
                ))}
              </div>
              <div className="bottom-section">
                <a href="#" className="text-link" onClick={openOptions}>
                  Options
                </a>
                <aside>
                  Brought to you with ♡ by&nbsp;
                  <a target="_blank" href="https://www.heroku.com">
                    Heroku
                  </a>
                </aside>
              </div>
            </>
          )}

          {showOptions && (
            <>
              <h1>Options</h1>
              <form>
                <label htmlFor="animations">Animations</label>
                <select
                  id="animations"
                  onChange={(e) => setSelectedOption(e.target.value === "true")}
                >
                  {showAnimations ? (
                    <>
                      <option value="true" defaultValue={true}>
                        On
                      </option>
                      <option value="false">Off</option>
                    </>
                  ) : (
                    <>
                      <option value="true">On</option>
                      <option value="false" defaultChecked={false}>
                        Off
                      </option>
                    </>
                  )}
                </select>
                <div className="form-buttons">
                  <a href="#" className="text-link" onClick={closeOptions}>
                    Cancel
                  </a>
                  <a href="#" className="text-link" onClick={saveOptions}>
                    Save
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      ) : null}
      <div className="activator" onClick={toggleWidget}>
        <canvas className="animation-canvas"></canvas>
      </div>
    </div>
  );
};

Widget.propTypes = {
  talkId: PropTypes.string,
  open: PropTypes.bool,
};

export default Widget;
