/** @jsx jsx */
import { jsx } from "@emotion/core";
import {colors as nookTheme} from '../../util/theme';

export default function HeaderBar({
  children,
  style
}: {
  children: JSX.Element;
  style?: any;
}) {
  return (
    <div
      css={{
        backgroundColor: nookTheme.blueDark,
        padding: "10px 5px",
        fontSize: 20,
        display: "flex",
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        ...style,
        "@media (min-width: 800px)": {
          alignItems: "flex-start"
        }
      }}
    >
      {children}
    </div>
  );
}
