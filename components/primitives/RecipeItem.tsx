import { colors } from "../../util/theme";

export default function RecipeItem({ recipe }: { recipe: any }) {
  return (
    <div
      css={{
        display: "inline-block",
        backgroundColor: colors.blueDark,
        color: colors.blueLight,
        width: 125,
        padding: 10,
        margin: 5,
        borderRadius: "1em"
      }}
    >
      <img src={recipe.wikiImageUrl} />
      <div>{recipe.name}</div>
      <div>{recipe.sellPrice}</div>
      <div>{recipe.type}</div>
    </div>
  );
}
