import RSelect from "react-select";
import { customSelectStylesLight } from "../../util/theme";

export interface Props {
  value: string;
  options: any[];
  placeholder: string;
  onChange: (value?: string) => void;
}

export default function Select({
  options,
  placeholder,
  value,
  onChange
}: Props) {
  return (
    <RSelect
      value={
        value && options.includes(value) ? { label: value, value } : undefined
      }
      options={options.map(o => ({ label: o, value: o }))}
      placeholder={placeholder}
      styles={customSelectStylesLight}
      isClearable
      onChange={value => {
        onChange(value ? (value as any).value : undefined);
      }}
    />
  );
}
