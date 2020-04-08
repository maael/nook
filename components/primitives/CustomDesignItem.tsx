/** @jsx jsx */
import { jsx } from "@emotion/core";
import { getUserName, getUserIcon, getUserProfileLink } from "../../util/user";
import { colors } from "../../util/theme";

export default function CustomDesignItem({
  customDesign: { s3Url, title, code, user, tags }
}: {
  customDesign: {
    s3Url: string;
    code: string;
    title: string;
    user: any;
    tags: string[];
  };
}) {
  return (
    <div
      css={{
        display: "inline-block",
        margin: 10,
        width: 400,
        backgroundColor: colors.blueDark,
        color: colors.blueLight,
        borderRadius: "1em",
        overflow: "hidden",
        paddingBottom: 10
      }}
    >
      <img css={{ width: "100%" }} src={s3Url} />
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
    </div>
  );
}
