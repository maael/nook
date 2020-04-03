import {memo, useState, useEffect} from 'react';
import {colors} from '../../util/theme';

export const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

interface Props {
  active: number;
  onChange: (n: number) => void;
}

export default memo(function MonthBar  ({active, onChange}: Props) {
  return (
    <div css={{
      display: 'flex',
      justifyContent: 'space-around',
      borderRadius: '1em',
      overflow: 'hidden',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}>
      {MONTHS.map((m, i) => (
        <div
          key={`${m}-${i}-${active}`}
          css={{':hover': {backgroundColor: colors.blueMid}}}
          style={{padding: 10, flex: 1, backgroundColor: active === i ? colors.blueMid : colors.blueDark}}
          onClick={() => onChange(i)}
        >{m}</div>
      ))}
    </div>
  )
});