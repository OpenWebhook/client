import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect } from "react";

export const Code: React.FC<{ code: any; language: string }> = ({
  code,
  language,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const codeWithCariage = JSON.stringify(JSON.parse(code), null, 2);
  return (
    <div className="Code" style={{ width: "600px" }}>
      <pre>
        <code className={`language-${language}`}>{codeWithCariage}</code>
      </pre>
    </div>
  );
};
