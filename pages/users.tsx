import { useState } from "react";
import Link from "next/link";
import useFetch from "../components/hooks/useFetch";
import SafeImage from "../components/primitives/SafeImage";
import * as userUtil from "../util/user";
import { styles as generalStyles, colors } from "../util/theme";

export default function UsersSearch() {
  const [search, setSearch] = useState("");
  const [users, loadingUsers] = useFetch<any[]>(
    "/db/user",
    {},
    {
      source: "local",
      defaultValue: [],
      mapper: d => d.data
    }
  );
  return (
    <div css={{ marginTop: 10 }}>
      <input
        css={[generalStyles.input as any, { maxWidth: 600, margin: "0 auto" }]}
        placeholder={
          loadingUsers ? "Loading..." : `Search ${users.length} users...`
        }
        onChange={e => setSearch(e.target.value)}
      />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          flexWrap: "wrap",
          margin: "0 auto",
          maxWidth: 600
        }}
      >
        {users
          .filter(u =>
            userUtil
              .getUserName(u)
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map(user => (
            <div
              key={user._id}
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: 5,
                backgroundColor: colors.blueDark,
                padding: "4px 5px",
                borderRadius: "0.5em",
                color: colors.blueLight
              }}
            >
              <SafeImage
                setWidthOnError={false}
                css={{
                  border: `2px solid ${colors.blueLight}`,
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  marginRight: 5
                }}
                src={userUtil.getUserIcon(user)}
              />
              <Link
                href="/user/[type]/[name]"
                as={userUtil.getUserProfileLink(user)}
                css={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit"
                }}
              >
                {userUtil.getUserName(user)}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
