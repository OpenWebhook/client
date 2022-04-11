import NavBar from "@pluralsight/ps-design-system-navbar";
import NavBrand from "@pluralsight/ps-design-system-navbrand";
import React from "react";
import { UserOrLogin } from "./Login/UserOrLogin";
import { RedirectUrlInput } from "./RedirectUrl/RedirectUrl.component";
import { WebhookStoreUrlInput } from "./WebhookStoreUrl/WebhookStoreUrl.component";

function SkillsLogo() {
  return (
    <svg aria-hidden viewBox="0 0 32 32">
      <defs>
        <linearGradient
          id="skills-gradient"
          x1="45.6377"
          y1="47.4727"
          x2="-32.2436"
          y2="-35.2537"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.03" stopColor="#23F0C7" />
          <stop offset="0.93" stopColor="#5C8001" />
        </linearGradient>
      </defs>
      <path
        d="
          M 0 0 V 32 H 32 V 0 H 0 Z M 6 10 L 12 10 L 9 15 Z M 0 10 L 4 10 L 9 18 L 14 10 L 18 10 L 23 18 L 28 10 L 32 10 L 23 24 L 16 13 L 9 24 Z M 20 10 L 26 10 L 23 15 L 20 10 M 16 19 L 19 24 L 13 24 L 16 19
          "
        fill="url(#skills-gradient)"
      />
    </svg>
  );
}

function SkillsBranding(props: any) {
  return <NavBrand {...props} logo={<SkillsLogo />} wordmark="Open Webhook" />;
}

export function SkillsTopNav() {
  return (
    <div>
      <NavBar
        brand={<SkillsBranding />}
        items={[
          <WebhookStoreUrlInput key={"WebhookStoreUrlInput"} />,
          <RedirectUrlInput key={"RedirectUrlInput"} />,
        ]}
        user={<UserOrLogin />}
      />
    </div>
  );
}
