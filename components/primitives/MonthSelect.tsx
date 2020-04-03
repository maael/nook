import RSelect from 'react-select';
import {customSelectStyles} from '../../util/theme';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const MONTH_OPTIONS = MONTHS.map((v, i) => ({label: v, value: i}))

export interface Props {
  value?: number;
  onChange: (n?: number) => void;
}

export default function MonthSelect ({value, onChange}: Props) {
  return (
    <RSelect
      styles={customSelectStyles}
      isClearable
      isSearchable={false}
      options={MONTH_OPTIONS}
      placeholder='Month...'
      value={MONTH_OPTIONS.find((o) => o.value === value)}
      onChange={(valueType) => {
        if (valueType) {
          onChange((valueType as any).value);
        } else {
          onChange(undefined);
        }
      }}
    />
  )
}