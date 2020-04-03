import {useMemo} from 'react';
import RSelect from 'react-select';
import {fishSizeMap} from '../../util/collections';
import {customSelectStyles} from '../../util/theme';

export interface Props {
  data: any[];
  values: string[];
  onChange: (n: string[]) => void;
}

function getOptionsFromData (data: any[]) {
  return [...new Set(data.map(({shadowSize}) => shadowSize))].map((v) => ({label: fishSizeMap[v], value: v}));
}

export default function FishSizeSelect ({data, values, onChange}: Props) {
  const options = useMemo(() => getOptionsFromData(data), [values, data]);
  return (
    <RSelect
      styles={customSelectStyles}
      isMulti
      isClearable
      isSearchable={false}
      options={options}
      placeholder='Shadow...'
      value={options.filter((o, i) => values.includes(o.value))}
      onChange={(valueType) => {
        if (valueType) {
          onChange((valueType as any).map(({value}) => value));
        } else {
          onChange([]);
        }
      }}
    />
  )
}