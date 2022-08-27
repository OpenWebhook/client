import Button from "@pluralsight/ps-design-system-button";
import lottie from "lottie-web";
import copyIcon from "../animations/copy.json";
import "../animations/animation-container.css";
import React, { useEffect, useRef } from "react";

const animationName = "copy";

export const CopyButton = ({ text }: { text: string }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: copyIcon,
        name: animationName,
      });
      lottie.setSpeed(3, animationName);
    }

    return () => {
      lottie.destroy(animationName);
    };
  }, []);

  return (
    <Button
      appearance={Button.appearances.stroke}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          alert("Copied " + text);
        });
      }}
      onMouseEnter={() => {
        lottie.setDirection(1, animationName);
        lottie.play(animationName);
      }}
      onMouseLeave={() => {
        lottie.setDirection(-1, animationName);
        lottie.play(animationName);
      }}
    >
      Copy curl
      <div className="animation-container-blue" ref={container} />
    </Button>
  );
};
