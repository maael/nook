import React from "react";

export default function HideOnMobile({
  children,
  style
}: {
  children: any;
  style?: React.CSSProperties;
}) {
  return (
    <div
      css={
        {
          ...style,
          display: "none",
          "@media (min-width: 800px)": {
            display: "initial"
          }
        } as any
      }
    >
      {children}
    </div>
  );
}
