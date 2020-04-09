import { useState } from "react";
import fetch from "isomorphic-fetch";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import TemtemText from "@maael/temtem-text-component";
import TemtemButton from "@maael/temtem-button-component";
import useJWT from "../../../../components/hooks/useJWT";
import EditUserDetails from "../../../../components/compositions/EditUserDetails";
import { getUserName, getUserIcon } from "../../../../util/user";
import { User } from "../../../../types/db";
import { colors, styles } from "../../../../util/theme";

export default function UserPage({ user = {} as any }: { user: User }) {
  const jwt = useJWT();
  const [editing, setEditing] = useState(false);
  return (
    <div css={{ textAlign: "center", marginTop: 10 }}>
      <img
        css={{
          border: `2px solid ${colors.blueDark}`,
          height: 50,
          width: 50,
          borderRadius: "50%",
          margin: "0px 5px"
        }}
        src={getUserIcon(user)}
      />
      <TemtemText style={{ fontSize: 40 }} borderWidth={10}>
        {getUserName(user)}
      </TemtemText>
      {user.redditName ? (
        <a href={`https://reddit.com/user/${user.redditName}`}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative",
              paddingLeft: 30
            }}
            bgColor="#FF5700"
          >
            <>
              <FaRedditAlien
                style={{ fontSize: 18, position: "absolute", left: 8, top: 9 }}
              />
              {user.redditName}
            </>
          </TemtemButton>
        </a>
      ) : null}
      {user.discordFullName ? (
        <a href={"https://discordapp.com/"}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative",
              paddingLeft: 30
            }}
            bgColor="#7289DA"
          >
            <>
              <FaDiscord
                style={{ fontSize: 18, position: "absolute", left: 8, top: 9 }}
              />
              {user.discordFullName}
            </>
          </TemtemButton>
        </a>
      ) : null}
      {user.nintendoName ? (
        <a href={"https://store.steampowered.com/app/745920/Temtem/"}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative"
            }}
            bgColor={colors.blueDark}
          >
            <>"{user.nintendoName}" in game</>
          </TemtemButton>
        </a>
      ) : null}
      {user.animalCrossingTag ? (
        <a href={"https://store.steampowered.com/app/745920/Temtem/"}>
          <TemtemButton
            size="small"
            style={{
              margin: "0px 5px 10px",
              position: "relative"
            }}
            bgColor={"#7FCE2A"}
          >
            <>"{user.animalCrossingTag}" Maker ID</>
          </TemtemButton>
        </a>
      ) : null}
      <div>
        {jwt && jwt._id === user._id ? (
          editing ? (
            <EditUserDetails user={user} onClose={() => setEditing(false)} />
          ) : (
            <button css={styles.button} onClick={() => setEditing(true)}>
              Edit
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}

UserPage.getInitialProps = async ({ req, query }) => {
  try {
    const host = req ? req.headers.host : window.location.host;
    const res = await fetch(
      `${host.includes("localhost") ? "http" : "https"}://${host}/api/db/user/${
        query.type
      }/${query.name}`,
      { headers: req ? req.headers : {} }
    );
    if (res.ok) {
      const user = await res.json();
      return {
        user
      };
    }
    console.warn("failed to get user");
    return {};
  } catch (e) {
    console.error("error", e);
    return {};
  }
};
