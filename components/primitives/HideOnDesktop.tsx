import React from "react";

export default function HideOnDesktop({
  style,
  children
}: {
  children: any;
  style?: React.CSSProperties;
}) {
  return (
    <div
      css={
        {
          ...style,
          "@media (min-width: 800px)": {
            display: "none"
          }
        } as any
      }
    >
      {children}
    </div>
  );
}
