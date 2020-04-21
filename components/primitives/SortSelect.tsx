import RSelect from "react-select";
import { customSelectStyles } from "../../util/theme";
import { sortOptions } from "../../util/constants";
import { SortOption } from "../../types";

export interface Props {
  value?: SortOption;
  onChange: (n?: SortOption) => void;
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <RSelect
      styles={customSelectStyles}
      isClearable
      isSearchable={false}
      options={sortOptions}
      placeholder="Sort..."
      value={sortOptions.find(o => o.value === value)}
      onChange={valueType => {
        if (valueType) {
          onChange((valueType as any).value);
        } else {
          onChange(undefined);
        }
      }}
    />
  );
}
