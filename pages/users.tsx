import { useState } from "react";
import Link from "next/link";
import TemtemInput from "@maael/temtem-input-component";
import TemtemText from "@maael/temtem-text-component";
import Loading from "../components/primitives/Loading";
import useFetch from "../components/hooks/useFetch";
import { colors } from "@maael/temtem-theme";
import * as userUtil from "../util/user";

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
      <TemtemInput
        containerStyle={{ maxWidth: 600, margin: "0 auto" }}
        placeholder={`Search ${users.length} users...`}
        value={search}
        onChange={e => setSearch((e.target as any).value)}
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
        <Loading loading={loadingUsers} />
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
                margin: "5px 10px"
              }}
            >
              <img
                css={{
                  border: `2px solid ${colors.uiBlueFaded}`,
                  height: 30,
                  width: 30,
                  borderRadius: "50%",
                  margin: "0px 5px"
                }}
                src={userUtil.getUserIcon(user)}
              />
              <Link
                href="/user/[type]/[name]"
                as={userUtil.getUserProfileLink(user)}
              >
                <a css={{ textDecoration: "none", cursor: "pointer" }}>
                  <TemtemText containerStyle={{ marginRight: 5 }}>
                    {userUtil.getUserName(user)}
                  </TemtemText>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
