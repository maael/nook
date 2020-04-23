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
import AccountBadge from "../../../../components/primitives/AccountBadge";
import { getUserIcon } from "../../../../util/user";
import { User } from "../../../../types/db";
import { colors, styles as generalStyles } from "../../../../util/theme";
import { getImageUrl } from "../../../../util/getImageUrl";

const bugsData = require("../../../../data/bugs.json");
const fishData = require("../../../../data/fish.json");

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
      <AccountBadge
        username={user.redditName}
        color="#FF5700"
        link={`https://reddit.com/user/${user.redditName}`}
        Icon={FaRedditAlien}
      />
      <AccountBadge
        username={user.discordFullName}
        color="#7289DA"
        link="https://discordapp.com/"
        Icon={FaDiscord}
      />
      <AccountBadge
        username={user.nintendoName ? `"${user.nintendoName}" in game` : ""}
        color="#E4000F"
        link="https://discordapp.com/"
        Icon={FaNintendoSwitch}
      />
      <AccountBadge
        username={
          user.animalCrossingTag ? `"${user.animalCrossingTag}" Maker ID` : ""
        }
        color="#7FCE2A"
        link="https://discordapp.com/"
        Icon={FaGlobe}
      />
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
      {user.redditId === "661nj81f" ? null : (
        <div css={{ marginTop: 10 }}>
          <Heading>Collected Bugs</Heading>
          <Heading size={15}>
            {user.profile!.bugs.length} / {bugsData.length} (
            {((user.profile!.bugs.length / bugsData.length) * 100).toFixed(0)}%)
          </Heading>
          <div
            css={{
              marginBottom: 10,
              margin: "0 auto",
              width: "80vw",
              maxWidth: 800
            }}
          >
            {bugsData
              .filter(({ name }) =>
                user.profile!.bugs.some(
                  ({ name: profileName }) => name === profileName
                )
              )
              .map(({ name }) => (
                <img key={name} src={getImageUrl("bug", name)} />
              ))}
          </div>
          <Heading>Collected Fish</Heading>
          <Heading size={15}>
            {user.profile!.fish.length} / {fishData.length} (
            {((user.profile!.fish.length / bugsData.length) * 100).toFixed(0)}%)
          </Heading>
          <div
            css={{
              marginBottom: 10,
              margin: "0 auto",
              width: "80vw",
              maxWidth: 800
            }}
          >
            {fishData
              .filter(({ name }) =>
                user.profile!.fish.some(
                  ({ name: profileName }) => name === profileName
                )
              )
              .map(({ name }) => (
                <img key={name} src={getImageUrl("fish", name)} />
              ))}
          </div>
          <Heading>Custom Designs</Heading>
          <div css={{ marginBottom: 10 }}>
            {user.profile!.customDesigns.map(({ s3Url }) => (
              <img
                css={{
                  width: 400,
                  maxWidth: "90vw",
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
                    maxWidth: "90vw",
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
      )}
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
