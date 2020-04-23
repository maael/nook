import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { FaTimes } from "react-icons/fa";
import { styles as generalStyles } from "../../util/theme";

const LanguageControl = dynamic(() => import("./LanguageControl"), {
  ssr: false
});

interface Props {
  value: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({ value, setSearch }: Props) {
  return (
    <div css={{ position: "relative" }}>
      <input
        css={generalStyles.input}
        placeholder="Search..."
        value={value}
        onChange={e => setSearch(e.target.value)}
      />
      {value.trim() ? (
        <FaTimes
          onClick={() => setSearch("")}
          style={{
            position: "absolute",
            top: "50%",
            right: 35,
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
        />
      ) : null}
      <LanguageControl
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)"
        }}
      />
    </div>
  );
}
