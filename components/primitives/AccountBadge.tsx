import { IconType } from "react-icons/lib/cjs";
import { styles as generalStyles } from "../../util/theme";

export default function AccountBadge({
  username,
  link,
  Icon,
  color
}: {
  color?: string;
  username?: string;
  link?: string;
  Icon: IconType;
}) {
  return username ? (
    <a
      href={link || "#"}
      css={{ textDecoration: "none", display: "inline-block" }}
    >
      <button
        style={{
          margin: "0px 5px 10px",
          color: "#FFFFFF",
          backgroundColor: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        css={generalStyles.button}
      >
        <Icon size={18} style={{ position: "relative", marginRight: 4 }} />
        {username}
      </button>
    </a>
  ) : null;
}
