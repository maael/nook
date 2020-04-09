import { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import { customSelectStylesLight } from "../../util/theme";

export interface Props {
  value: string[];
  options: any[];
  placeholder: string;
  onChange: (value: string[]) => void;
}

export default function SimpleCreatableSelect({
  onChange,
  options,
  value,
  placeholder
}: Props) {
  const opts = useMemo(() => options.map(o => ({ label: o, value: o })), [
    options
  ]);
  return (
    <CreatableSelect
      isMulti
      placeholder={placeholder}
      styles={customSelectStylesLight}
      value={value.map(v => ({ label: v, value: v }))}
      onChange={newValue => {
        onChange(newValue ? (newValue as any).map(({ value }) => value) : []);
      }}
      options={opts}
    />
  );
}
