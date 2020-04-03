import {InterpolationWithTheme} from '@emotion/core';
import {Styles} from 'react-select';

export const colors = {
  turquoiseLight: '#82d8ab',
  turquoiseMid: '#72d3a0',
  turquoiseDark: '#2ccb7b',
  green: '#22a154',
  blueGreen: '#31d9c2',
  brown: '#c56e11',
  brownDark: '#3c0a03',
  offWhite: '#f7f8d8',
  blueLight: '#c1d3fd',
  blueLight2: '#b8c6fb',
  blueMid: '#889af8',
  blueDark: '#5783db',
} as const;

export const customSelectStyles: Styles = {
  control: (existing) => ({
    ...existing,
    backgroundColor: colors.blueDark,
    border: 'none',
    marginTop: 5,
    marginBottom: 5
  }),
  placeholder: (existing) => ({
    ...existing,
    color: colors.blueLight
  }),
  menu: (existing) => ({
    ...existing,
    backgroundColor: colors.blueDark
  }),
  multiValue: (existing) => ({
    ...existing,
    borderRadius: 10
  }),
  multiValueLabel: (existing) => ({
    ...existing,
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    borderTopLeftRadius: '1em',
    borderBottomLeftRadius: '1em',
    fontWeight: 'bold'
  }),
  multiValueRemove: (existing) => ({
    ...existing,
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    borderTopRightRadius: '1em',
    borderBottomRightRadius: '1em',
    fontWeight: 'bold'
  }),
  singleValue: (existing) => ({
    ...existing,
    color: colors.blueLight,
    fontWeight: 'bold',
  })
}

export const styles: Record<string, InterpolationWithTheme<any>> = {
  input: {
    alignItems: 'center',
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderColor: 'hsl(0,0%,80%)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: 38,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',
    boxSizing: 'border-box',
    border: 'none',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    fontSize: 16,
    fontFamily: 'Nunito,Arial,sans-serif',
    '::placeholder': {
      color: colors.blueLight,
      fontSize: 16,
      fontFamily: 'Nunito,Arial,sans-serif'
    }
  }
}