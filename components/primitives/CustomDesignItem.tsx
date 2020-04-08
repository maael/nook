/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FaTimes as DeleteIcon } from "react-icons/fa";
import { getUserName, getUserIcon, getUserProfileLink } from "../../util/user";
import useJWT from "../hooks/useJWT";
import { colors } from "../../util/theme";

export const WIDTH = 400;
export const HEIGHT = 317;
export const PADDING = 20;

export default function CustomDesignItem({
  customDesign: { s3Url, title, code, user, tags },
  onDelete
}: {
  customDesign: {
    s3Url: string;
    code: string;
    title: string;
    user: any;
    tags: string[];
  };
  onDelete: () => void;
}) {
  const jwt = useJWT();
  return (
    <div
      css={{
        display: "inline-block",
        margin: 10,
        width: WIDTH,
        backgroundColor: colors.blueDark,
        color: colors.blueLight,
        borderRadius: "1em",
        paddingBottom: 10,
        textAlign: "center",
        position: "relative"
      }}
    >
      <div
        css={{
          cursor: "zoom-in",
          borderTopLeftRadius: "1em",
          borderTopRightRadius: "1em",
          width: "100%",
          height: 220,
          backgroundImage: `url(${s3Url})`,
          backgroundRepeat: "none",
          backgroundSize: "contain"
        }}
      ></div>
      <div css={{ marginBottom: 5, marginTop: 5 }}>{title}</div>
      <div css={{ marginBottom: 5, marginTop: 5 }}>{code}</div>
      <div css={{ marginBottom: 5, marginTop: 5 }}>{tags.join(", ")}</div>
      <a
        href={getUserProfileLink(user)}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none"
        }}
      >
        <img
          css={{ width: 40, marginRight: 5, borderRadius: "50%" }}
          src={getUserIcon(user)}
        />
        {getUserName(user)}
      </a>
      {jwt && user._id === jwt._id ? (
        <div
          css={{
            position: "absolute",
            cursor: "pointer",
            fontSize: 12,
            backgroundColor: colors.blueLight,
            color: colors.blueDark,
            top: 10,
            right: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            borderRadius: "0.3em"
          }}
          onClick={onDelete}
        >
          Delete <DeleteIcon size={14} />
        </div>
      ) : null}
    </div>
  );
}
