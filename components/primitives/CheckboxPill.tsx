import { ReactNode } from "react";
import { colors } from "../../util/theme";

interface Props {
  checked: boolean | undefined;
  onChange: (checked: boolean | undefined) => void;
  label: string;
  icon: ReactNode;
  uncheckedIcon?: ReactNode;
  intermediateIcon?: ReactNode;
  allowIntermediate?: boolean;
}

export default function CheckboxPill({
  checked,
  onChange,
  label,
  icon,
  uncheckedIcon = null,
  intermediateIcon = null,
  allowIntermediate = false
}: Props) {
  const nextValue = allowIntermediate
    ? checked === false
      ? undefined
      : !checked
    : !checked;
  return (
    <div
      onClick={() => onChange(nextValue)}
      css={{
        outline: "none",
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blueDark,
        color: colors.blueLight,
        margin: "2px 10px",
        padding: 5,
        borderRadius: "0.3em",
        cursor: "pointer"
      }}
    >
      <div
        css={{
          backgroundColor: colors.blueLight,
          color: colors.blueDark,
          padding: "5px 5px 1px 5px",
          height: 19,
          width: 16,
          marginRight: 4,
          borderRadius: "0.3em"
        }}
      >
        {allowIntermediate && checked === undefined
          ? intermediateIcon
          : !!checked
          ? icon
          : uncheckedIcon}
      </div>
      <div>{label}</div>
    </div>
  );
}
