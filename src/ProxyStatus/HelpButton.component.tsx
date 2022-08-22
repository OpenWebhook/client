import React, { useEffect, useRef } from "react";
import helpIcon from "../animations/help.json";
import lottie from "lottie-web";
import { Label } from "@pluralsight/ps-design-system-text";
import "./help-btn.css";

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
      });
      lottie.setSpeed(3);
    }

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <>
      <Label
        onMouseEnter={() => {
          lottie.setDirection(1);
          lottie.play();
        }}
        onMouseLeave={() => {
          lottie.setDirection(-1);
          lottie.play();
        }}
        size={Label.sizes.xSmall}
        style={{ marginRight: "8px", marginLeft: "8px" }}
      >
        Debug webhooks on your localhost
      </Label>
      <div
        className="help-btn"
        ref={container}
        onMouseEnter={() => {
          lottie.setDirection(1);
          lottie.play();
        }}
        onMouseLeave={() => {
          lottie.setDirection(-1);
          lottie.play();
        }}
      />
    </>
  );
}
