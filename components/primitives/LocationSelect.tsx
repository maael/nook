import {useMemo} from 'react';
import RSelect from 'react-select';
import {customSelectStyles} from '../../util/theme';

export interface Props {
  data: any[];
  values: string[];
  onChange: (n: string[]) => void;
}

function getOptionsFromData (data: any[]) {
  return [...new Set(data.map(({location}) => location))].map((v) => ({label: v, value: v}));
}

export default function LocationSelect ({data, values, onChange}: Props) {
  const options = useMemo(() => getOptionsFromData(data), [values, data]);
  return (
    <RSelect
      styles={customSelectStyles}
      isMulti
      isClearable
      isSearchable={false}
      options={options}
      placeholder='Location...'
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