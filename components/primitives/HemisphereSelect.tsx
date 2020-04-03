import RSelect from "react-select";
import { customSelectStyles } from "../../util/theme";

export interface Props {
  value: string;
  onChange: (n: string) => void;
}

const OPTIONS = [
  { label: "Northern Hemisphere", value: "Northern Hemisphere" },
  { label: "Southern Hemisphere", value: "Southern Hemisphere" }
];

export default function HemisphereSelect({ value, onChange }: Props) {
  return (
    <RSelect
      styles={customSelectStyles}
      isSearchable={false}
      options={OPTIONS}
      placeholder="Hemisphere..."
      value={OPTIONS.find(o => o.value === value)}
      onChange={valueType => {
        if (valueType) {
          onChange((valueType as any).value);
        }
      }}
    />
  );
}
