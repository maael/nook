import { InterpolationWithTheme } from "@emotion/core";
import { Styles } from "react-select";

export const colors = {
  turquoiseLight: "#82d8ab",
  turquoiseMid: "#72d3a0",
  turquoiseDark: "#2ccb7b",
  green: "#22a154",
  blueGreen: "#31d9c2",
  brown: "#c56e11",
  brownDark: "#3c0a03",
  offWhite: "#f7f8d8",
  blueLight: "#c1d3fd",
  blueLight2: "#b8c6fb",
  blueMid: "#889af8",
  blueDark: "#5783db",
  redLight: "#ff8a80",
  redMid: "#ff5252",
  redDark: "#b71c1c",
  rockGrey: "#81878b",
  bagBrown: "#9d5700"
} as const;

export const customSelectStyles: Styles = {
  control: existing => ({
    ...existing,
    backgroundColor: colors.blueDark,
    border: "none",
    marginTop: 5,
    marginBottom: 5
  }),
  placeholder: existing => ({
    ...existing,
    color: colors.blueLight
  }),
  menu: existing => ({
    ...existing,
    backgroundColor: colors.blueDark,
    color: colors.blueLight
  }),
  multiValue: existing => ({
    ...existing,
    borderRadius: 10,
    backgroundColor: colors.blueLight
  }),
  multiValueLabel: existing => ({
    ...existing,
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    borderTopLeftRadius: "1em",
    borderBottomLeftRadius: "1em",
    fontWeight: "bold"
  }),
  multiValueRemove: existing => ({
    ...existing,
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    borderRadius: 0,
    borderTopRightRadius: "1em",
    borderBottomRightRadius: "1em",
    fontWeight: "bold"
  }),
  singleValue: existing => ({
    ...existing,
    color: colors.blueLight
  }),
  clearIndicator: existing => ({
    ...existing,
    color: colors.blueLight,
    cursor: "pointer",
    padding: 0
  }),
  dropdownIndicator: existing => ({
    ...existing,
    color: colors.blueLight
  }),
  indicatorSeparator: existing => ({
    ...existing,
    display: "none"
  })
};

export const customSelectStylesLight = {
  control: existing => ({
    ...existing,
    backgroundColor: colors.blueLight,
    border: "none",
    margin: 2
  }),
  placeholder: existing => ({
    ...existing,
    color: colors.blueDark
  }),
  menu: existing => ({
    ...existing,
    backgroundColor: colors.blueLight,
    color: colors.blueDark
  }),
  multiValue: existing => ({
    ...existing,
    borderRadius: 10
  }),
  multiValueLabel: existing => ({
    ...existing,
    backgroundColor: colors.blueDark,
    color: colors.blueLight,
    borderRadius: 0,
    borderTopLeftRadius: "1em",
    borderBottomLeftRadius: "1em",
    fontWeight: "bold"
  }),
  multiValueRemove: existing => ({
    ...existing,
    backgroundColor: colors.blueDark,
    color: colors.blueLight,
    borderTopRightRadius: "1em",
    borderBottomRightRadius: "1em",
    fontWeight: "bold"
  }),
  singleValue: existing => ({
    ...existing,
    color: colors.blueDark
  }),
  clearIndicator: existing => ({
    ...existing,
    color: colors.blueDark,
    cursor: "pointer",
    padding: 0
  }),
  dropdownIndicator: existing => ({
    ...existing,
    color: colors.blueDark
  }),
  indicatorSeparator: existing => ({
    ...existing,
    display: "none"
  })
};

export const styles: Record<string, any> = {
  input: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignItems: "center",
    color: colors.blueLight,
    backgroundColor: colors.blueDark,
    borderColor: "hsl(0,0%,80%)",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: 38,
    outline: "none",
    position: "relative",
    transition: "all 100ms",
    boxSizing: "border-box",
    border: "none",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    fontSize: 16,
    fontFamily: "Nunito,Arial,sans-serif",
    "::placeholder": {
      color: colors.blueLight,
      fontSize: 16,
      fontFamily: "Nunito,Arial,sans-serif"
    }
  },
  inputLight: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignItems: "center",
    color: colors.blueDark,
    backgroundColor: colors.blueLight,
    borderColor: "hsl(0,0%,80%)",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: 38,
    outline: "none",
    position: "relative",
    transition: "all 100ms",
    boxSizing: "border-box",
    border: "none",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    fontSize: 16,
    fontFamily: "Nunito,Arial,sans-serif",
    "::placeholder": {
      color: colors.blueDark,
      fontSize: 16,
      fontFamily: "Nunito,Arial,sans-serif"
    }
  },
  button: {
    backgroundColor: colors.blueMid,
    borderRadius: 4,
    color: colors.blueLight,
    border: "none",
    flex: 1,
    fontSize: 16,
    margin: 2,
    fontFamily: "Nunito,Arial,sans-serif",
    cursor: "pointer",
    outline: "none",
    "&:disabled": {
      color: colors.blueDark,
      cursor: "not-allowed",
      backgroundColor: "rgba(136, 154, 248, 0.5)"
    }
  },
  pageWrapper: {
    margin: "0px auto",
    textAlign: "center",
    padding: 10,
    maxWidth: 1200
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: colors.blueDark,
    "&:hover": {
      color: colors.brownDark
    }
  }
};
