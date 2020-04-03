import { colors } from "../../util/theme";

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
        borderRadius: "1em"
      }}
      style={{
        color: inCollection ? colors.blueDark : colors.blueLight,
        backgroundColor: inCollection ? colors.blueLight : colors.blueDark
      }}
      onClick={onClick}
    >
      <img src={recipe.wikiImageUrl} />
      <div>{recipe.name}</div>
      <div>{recipe.sellPrice}</div>
      <div>{recipe.type}</div>
    </div>
  );
}
