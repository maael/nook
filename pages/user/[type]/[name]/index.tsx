import { useState } from "react";
import fetch from "isomorphic-fetch";
import {
  FaDiscord,
  FaRedditAlien,
  FaNintendoSwitch,
  FaGlobe
} from "react-icons/fa";
import useJWT from "../../../../components/hooks/useJWT";
import EditUserDetails from "../../../../components/compositions/EditUserDetails";
import Heading from "../../../../components/primitives/Heading";
import { getUserIcon } from "../../../../util/user";
import { User } from "../../../../types/db";
import { colors, styles as generalStyles } from "../../../../util/theme";

const bugsData = require("../../../../data/bugs.json");
const fishData = require("../../../../data/fish.json");

const styles = {
  badge: {
    margin: "0px 5px 10px",
    color: "#FFFFFF"
  }
};

export default function UserPage({
  user = {} as any
}: {
  user: User & {
    profile?: {
      bugs: any[];
      fish: any[];
      fossils: any[];
      customDesigns: any[];
      savedCustomDesigns: any[];
    };
  };
}) {
  const jwt = useJWT();
  const [editing, setEditing] = useState(false);
  return (
    <div css={{ textAlign: "center", marginTop: 10 }}>
      <div>
        <img
          css={{
            border: `2px solid ${colors.blueDark}`,
            height: 50,
            width: 50,
            borderRadius: "50%",
            margin: "0px 5px 5px 5px"
          }}
          src={getUserIcon(user)}
        />
      </div>
      {user.redditName ? (
        <a href={`https://reddit.com/user/${user.redditName}`}>
          <button
            style={{
              ...styles.badge,
              backgroundColor: "#FF5700"
            }}
            css={generalStyles.button}
          >
            <FaRedditAlien
              size={18}
              style={{ position: "relative", top: 4, marginRight: 4 }}
            />
            {user.redditName}
          </button>
        </a>
      ) : null}
      {user.discordFullName ? (
        <a href={"https://discordapp.com/"}>
          <button
            style={{
              ...styles.badge,
              backgroundColor: "#7289DA"
            }}
            css={generalStyles.button}
          >
            <FaDiscord
              size={18}
              style={{ position: "relative", top: 4, marginRight: 4 }}
            />
            {user.discordFullName}
          </button>
        </a>
      ) : null}
      {user.nintendoName ? (
        <a href={"https://store.steampowered.com/app/745920/Temtem/"}>
          <button
            style={{
              ...styles.badge,
              backgroundColor: "#E4000F"
            }}
            css={generalStyles.button}
          >
            <FaNintendoSwitch
              size={18}
              style={{ position: "relative", top: 4, marginRight: 4 }}
            />
            {`"${user.nintendoName}" in game`}
          </button>
        </a>
      ) : null}
      {user.animalCrossingTag ? (
        <a href={"https://store.steampowered.com/app/745920/Temtem/"}>
          <button
            style={{
              ...styles.badge,
              backgroundColor: "#7FCE2A"
            }}
            css={generalStyles.button}
          >
            <FaGlobe
              size={18}
              style={{ position: "relative", top: 4, marginRight: 4 }}
            />
            {`"${user.animalCrossingTag}" Maker ID`}
          </button>
        </a>
      ) : null}
      <div>
        {jwt && jwt._id === user._id ? (
          editing ? (
            <EditUserDetails user={user} onClose={() => setEditing(false)} />
          ) : (
            <button css={generalStyles.button} onClick={() => setEditing(true)}>
              Edit
            </button>
          )
        ) : null}
      </div>
      <div css={{ marginTop: 10 }}>
        <Heading>Collected Bugs</Heading>
        <div css={{ marginBottom: 10 }}>
          {bugsData
            .filter(({ name }) =>
              user.profile!.bugs.some(
                ({ name: profileName }) => name === profileName
              )
            )
            .map(({ wikiImageUrl }) => (
              <img key={wikiImageUrl} src={wikiImageUrl} />
            ))}
        </div>
        <Heading>Collected Fish</Heading>
        <div css={{ marginBottom: 10 }}>
          {fishData
            .filter(({ name }) =>
              user.profile!.fish.some(
                ({ name: profileName }) => name === profileName
              )
            )
            .map(({ wikiImageUrl }) => (
              <img key={wikiImageUrl} src={wikiImageUrl} />
            ))}
        </div>
        <Heading>Custom Designs</Heading>
        <div css={{ marginBottom: 10 }}>
          {user.profile!.customDesigns.map(({ s3Url }) => (
            <img
              css={{
                width: 400,
                margin: 10,
                borderRadius: "1em",
                display: "inline-block"
              }}
              key={s3Url}
              src={s3Url}
            />
          ))}
        </div>
        <Heading>Saved Custom Designs</Heading>
        <div css={{ marginBottom: 10 }}>
          {user.profile!.savedCustomDesigns.map(
            ({ customDesign: { s3Url } }) => (
              <img
                css={{
                  width: 400,
                  margin: 10,
                  borderRadius: "1em",
                  display: "inline-block"
                }}
                key={s3Url}
                src={s3Url}
              />
            )
          )}
        </div>
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
