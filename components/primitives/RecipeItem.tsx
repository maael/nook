import { ReactNode } from "react";
import { FaToolbox, FaHome, FaTshirt, FaQuestionCircle } from "react-icons/fa";
import {
  GiSwapBag,
  GiBrickWall,
  GiRolledCloth,
  GiWoodenFence
} from "react-icons/gi";
import { colors } from "../../util/theme";

const typeIconMap: Record<string, ReactNode> = {
  tool: <FaToolbox title="Tools" />,
  houseware: <FaHome title="Houseware" />,
  misc: <FaQuestionCircle title="Misc" />,
  wallMounted: <GiBrickWall title="Wall Mounted" />,
  wallpaperFlooringRug: <GiRolledCloth title="Wallpaper/Flooring/Rug" />,
  equipment: <FaTshirt title="Equipment" />,
  other: <GiWoodenFence title="Other" />
};

interface Props {
  recipe: any;
  onClick: () => void;
  inCollection: boolean;
}

export default function RecipeItem({ recipe, inCollection, onClick }: Props) {
  return (
    <div
      css={{
        display: "inline-block",
        backgroundColor: colors.blueDark,
        color: colors.blueLight,
        cursor: "pointer",
        width: 125,
        padding: 10,
        margin: 5,
        borderRadius: "1em",
        position: "relative"
      }}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
      onClick={onClick}
    >
      <img src={recipe.wikiImageUrl} />
      <div>{recipe.name}</div>
      <div>
        {recipe.sellPrice} <GiSwapBag />
      </div>
      <div
        css={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "4px 4px 2px 4px",
          borderRadius: "50%",
          color: inCollection ? colors.blueLight : colors.blueDark,
          backgroundColor: inCollection ? colors.blueDark : colors.blueLight
        }}
      >
        {typeIconMap[recipe.type]}
      </div>
      <div>
        Obtained from:{" "}
        {recipe.obtainedFrom.length ? recipe.obtainedFrom.join(", ") : "???"}
      </div>
    </div>
  );
}