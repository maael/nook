import React, { useState } from "react";
import useCallableFetch from "../hooks/useCallableFetch";
import { User } from "../../types/db";
import { getUserType, UserType } from "../../util/user";
import { styles } from "../../util/theme";

interface Props {
  user: User;
  onClose: () => void;
}

export default function EditUserDetails({ user, onClose }: Props) {
  const [nintendoName, setNintendoName] = useState(user.nintendoName || "");
  const [discordFullName, setDiscordFullName] = useState(
    user.discordFullName || ""
  );
  const [redditName, setRedditName] = useState(user.redditName || "");
  const [animalCrossingTag, setAnimalCrossingTag] = useState(
    user.animalCrossingTag || ""
  );
  const [updateUser, _data, savingUpdate] = useCallableFetch(
    "/db/user",
    { method: "PUT" },
    { source: "local" }
  );
  const userType = getUserType(user);
  return (
    <div
      css={{ maxWidth: 500, margin: "5px auto 15px auto", padding: "0px 10px" }}
    >
      <input
        disabled={userType === UserType.REDDIT}
        css={styles.input}
        style={{ backgroundColor: "#7289DA", color: "#FFFFFF" }}
        placeholder="Discord Username..."
        value={discordFullName}
        onChange={({ target }) => setDiscordFullName((target as any).value)}
      />
      <input
        disabled={userType === UserType.DISCORD}
        css={styles.input}
        style={{ backgroundColor: "#FF5700", color: "#FFFFFF" }}
        placeholder="Reddit Username..."
        value={redditName}
        onChange={({ target }) => setRedditName((target as any).value)}
      />
      <input
        css={styles.input}
        style={{ backgroundColor: "#E4000F", color: "#FFFFFF" }}
        placeholder="Nintendo Username..."
        value={nintendoName}
        onChange={({ target }) => setNintendoName((target as any).value)}
      />
      <input
        css={styles.input}
        style={{ backgroundColor: "#7FCE2A", color: "#FFFFFF" }}
        placeholder="Maker Tag..."
        value={animalCrossingTag}
        onChange={({ target }) => setAnimalCrossingTag((target as any).value)}
      />
      <button
        css={styles.button}
        onClick={async () => {
          await updateUser({
            body: JSON.stringify({
              nintendoName: nintendoName || null,
              discordFullName: discordFullName || null,
              discordName: discordFullName.split("#")[0],
              discordDiscriminator: discordFullName.split("#")[1],
              redditName: redditName || null,
              animalCrossingTag: animalCrossingTag || null
            })
          });
          onClose();
        }}
        disabled={!!savingUpdate}
      >
        {savingUpdate ? "Saving" : "Save"}
      </button>
      <button
        onClick={() => {
          onClose();
        }}
        css={styles.button}
      >
        Close
      </button>
    </div>
  );
}
