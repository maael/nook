import { useMemo } from "react";
import RSelect from "react-select";
import { customSelectStyles } from "../../util/theme";

export interface Props<Value extends any> {
  data: any[];
  value: Value;
  onChange: (n: Value) => void;
  placeholder: string;
  /**
   * Default: false
   */
  isMulti?: boolean;
  /**
   * Default: true
   */
  allowUnselect?: boolean;
  field: string;
  labelMap?: Record<Value, string>;
}

function getOptionsFromData<Value extends any>(
  data: any[],
  field: string,
  labelMap?: Props<Value>["labelMap"]
): Array<{ label: string; value: string }> {
  const preparedData = data
    .map(d => d[field])
    .reduce((acc, arr) => acc.concat(arr), [])
    .filter(Boolean);
  return [...new Set<string>(preparedData)].map(v => ({
    label: labelMap ? labelMap[v] : v,
    value: v
  }));
}

export default function FishSizeSelect<Value extends any>({
  data,
  value,
  onChange,
  placeholder,
  field,
  labelMap,
  isMulti = false,
  allowUnselect = true
}: Props<Value>) {
  const options = useMemo(() => getOptionsFromData(data, field, labelMap), [
    value,
    data
  ]);
  return (
    <RSelect
      styles={customSelectStyles}
      isMulti={isMulti}
      isClearable={allowUnselect}
      isSearchable={false}
      options={options}
      placeholder={placeholder}
      value={options.filter(o =>
        isMulti ? value.includes(o.value) : o.value === (value as any)
      )}
      onChange={valueType => {
        if (valueType) {
          if (isMulti) {
            onChange((valueType as any).map(({ value }) => value));
          } else {
            onChange((valueType as any).value);
          }
        } else if (allowUnselect) {
          onChange(isMulti ? ([] as any) : undefined);
        }
      }}
    />
  );
}
