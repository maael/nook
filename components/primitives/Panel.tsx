import { ReactNode } from "react";
import { colors } from "../../util/theme";

export default function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      css={{
        backgroundColor: colors.offWhite,
        color: colors.brownDark,
        width: 600,
        maxWidth: "80vw",
        margin: "10px auto",
        padding: "12px 20px",
        borderRadius: "1em",
        lineHeight: "1.5em"
      }}
    >
      {children}
    </div>
  );
}
