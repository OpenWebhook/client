import NavBar from "@pluralsight/ps-design-system-navbar";
import NavBrand from "@pluralsight/ps-design-system-navbrand";
import React from "react";
import { RedirectUrlInput } from "./RedirectUrl/RedirectUrl.component";
import { WebhookStoreUrlInput } from "./WebhookStoreUrl/WebhookStoreUrl.component";

function SkillsLogo() {
  return (
    <svg
      width="512"
      height="512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="Gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#23F0C7" />
          <stop offset="100%" stopColor="#5C8001" />
        </linearGradient>
      </defs>
      <g fill="url(#Gradient)">
        <g transform="matrix(1.4641 0 0 1.4641 -887.9 -1.8431)">
          <circle
            transform="rotate(120)"
            cx="-145.18"
            cy="-715.55"
            r="30"
            fillRule="evenodd"
          />
          <rect
            transform="matrix(-.51803 .85537 -.85679 -.51566 0 0)"
            x="-236.02"
            y="-715.28"
            width="54.924"
            height="10"
            fillRule="evenodd"
            strokeWidth=".85576"
          />
          <rect x="725.13" y="28.997" width="108.64" height="9.9745" />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-735.11"
            width="129.99"
            height="9.9745"
            strokeWidth="1.0938"
          />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-833.77"
            width="91.693"
            height="9.9745"
            strokeWidth=".91869"
          />
        </g>
        <g transform="matrix(-.73205 1.2679 -1.2679 -.73205 1052.9 -593.23)">
          <circle
            transform="rotate(120)"
            cx="-145.18"
            cy="-715.55"
            r="30"
            fillRule="evenodd"
          />
          <rect
            transform="matrix(-.51803 .85537 -.85679 -.51566 0 0)"
            x="-236.02"
            y="-715.28"
            width="54.924"
            height="10"
            fillRule="evenodd"
            strokeWidth=".85576"
          />
          <rect x="725.13" y="28.997" width="108.64" height="9.9745" />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-735.11"
            width="129.99"
            height="9.9745"
            strokeWidth="1.0938"
          />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-833.77"
            width="91.693"
            height="9.9745"
            strokeWidth=".91869"
          />
        </g>
        <g transform="matrix(-.73205 -1.2679 1.2679 -.73205 595.36 1382.9)">
          <circle
            transform="rotate(120)"
            cx="-145.18"
            cy="-715.55"
            r="30"
            fillRule="evenodd"
          />
          <rect
            transform="matrix(-.51803 .85537 -.85679 -.51566 0 0)"
            x="-236.02"
            y="-715.28"
            width="54.924"
            height="10"
            fillRule="evenodd"
            strokeWidth=".85576"
          />
          <rect x="725.13" y="28.997" width="108.64" height="9.9745" />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-735.11"
            width="129.99"
            height="9.9745"
            strokeWidth="1.0938"
          />
          <rect
            transform="rotate(90)"
            x="36.972"
            y="-833.77"
            width="91.693"
            height="9.9745"
            strokeWidth=".91869"
          />
        </g>
      </g>
    </svg>
  );
}

function SkillsBranding(props: any) {
  return <NavBrand {...props} logo={<SkillsLogo />} wordmark="Open Webhook" />;
}

export default function TopNav() {
  return (
    <div>
      <NavBar
        brand={<SkillsBranding />}
        items={[
          <WebhookStoreUrlInput key={"WebhookStoreUrlInput"} />,
          <RedirectUrlInput key={"RedirectUrlInput"} />,
        ]}
      />
    </div>
  );
}
