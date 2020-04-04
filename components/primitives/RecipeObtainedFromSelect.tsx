import { useMemo } from "react";
import RSelect from "react-select";
import { customSelectStyles } from "../../util/theme";

export interface Props {
  data: any[];
  values: string[];
  onChange: (n: string[]) => void;
}

function getOptionsFromData(data: any[]) {
  return [
    ...new Set<string>(
      data
        .map(({ obtainedFrom }) => obtainedFrom)
        .reduce((acc, arr) => acc.concat(arr), [])
    )
  ]
    .filter(Boolean)
    .map(v => ({ label: v, value: v }));
}

export default function RecipeObtainedFromSelect({
  data,
  values,
  onChange
}: Props) {
  const options = useMemo(() => getOptionsFromData(data), [values, data]);
  return (
    <RSelect
      styles={customSelectStyles}
      isMulti
      isClearable
      isSearchable={false}
      options={options}
      placeholder="Obtained from..."
      value={options.filter((o, i) => values.includes(o.value))}
      onChange={valueType => {
        if (valueType) {
          onChange((valueType as any).map(({ value }) => value));
        } else {
          onChange([]);
        }
      }}
    />
  );
}
