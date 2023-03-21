import React, { useEffect, useRef } from "react";
import helpIcon from "../../animations/help.json";
import lottie from "lottie-web";
import { Label } from "@pluralsight/ps-design-system-text";
import "../../animations/animation-container.css";

const animationName = "help";

export function HelpText() {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: helpIcon,
        name: animationName,
      });
      lottie.setSpeed(3);
    }

    return () => {
      lottie.destroy(animationName);
    };
  }, []);

  return (
    <>
      <Label
        onMouseEnter={() => {
          lottie.setDirection(1, animationName);
          lottie.play(animationName);
        }}
        onMouseLeave={() => {
          lottie.setDirection(-1, animationName);
          lottie.play(animationName);
        }}
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Debug webhooks on your localhost
      </Label>
      <div
        className="animation-container-white"
        style={{ marginLeft: "-8px" }}
        ref={container}
        onMouseEnter={() => {
          lottie.setDirection(1, animationName);
          lottie.play(animationName);
        }}
        onMouseLeave={() => {
          lottie.setDirection(-1, animationName);
          lottie.play(animationName);
        }}
      />
    </>
  );
}
