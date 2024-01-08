import palette from "./palette";

const { primary, secondary, tertiary, quaternary, text } =
  palette.palette.default;
const fontWeight = [300, 400, 500, 700];

const createTypography = (
  fontSize,
  fontWeight,
  color,
  contrastText,
  textTransform
) => ({
  fontSize,
  fontWeight,
  color,
  contrastText,
  textTransform,
});

export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: fontWeight[0],
  fontWeightRegular: fontWeight[1],
  fontWeightMedium: fontWeight[2],
  fontWeightBold: fontWeight[3],
  h1: createTypography(
    "2rem",
    fontWeight[3],
    primary.main,
    primary.contrastText
  ),
  h2: createTypography(
    "1.5rem",
    fontWeight[2],
    secondary.main,
    secondary.contrastText
  ),
  h3: createTypography(
    "1.2rem",
    fontWeight[1],
    tertiary.main,
    tertiary.contrastText
  ),
  h4: createTypography(
    "1rem",
    fontWeight[1],
    quaternary.main,
    quaternary.contrastText
  ),
  h5: createTypography(
    "0.875rem",
    fontWeight[1],
    primary.main,
    primary.contrastText
  ),
  h6: createTypography(
    "0.75rem",
    fontWeight[0],
    secondary.main,
    secondary.contrastText
  ),
  subtitle1: createTypography(
    "1rem",
    fontWeight[1],
    tertiary.main,
    tertiary.contrastText
  ),
  subtitle2: createTypography(
    "0.875rem",
    fontWeight[1],
    quaternary.main,
    quaternary.contrastText
  ),
  body1: createTypography("1rem", fontWeight[1], text.primary),
  body2: createTypography("0.875rem", fontWeight[1], text.primary),
  button: createTypography(
    "0.875rem",
    fontWeight[2],
    primary.main,
    primary.contrastText,
    "uppercase"
  ),
  caption: createTypography("0.75rem", fontWeight[1], text.primary),
  overline: createTypography(
    "0.75rem",
    fontWeight[1],
    text.primary,
    null,
    "uppercase"
  ),
  link: createTypography(
    "1rem",
    fontWeight[1],
    primary.main,
    primary.contrastText,
    "none"
  ),
  tooltip: createTypography(
    "0.75rem",
    fontWeight[0],
    text.primary,
    text.primary,
    "none"
  ),
  alert: createTypography(
    "1rem",
    fontWeight[2],
    primary.main,
    primary.contrastText,
    "none"
  ),
  badge: createTypography(
    "0.75rem",
    fontWeight[3],
    primary.main,
    primary.contrastText,
    "uppercase"
  ),
  listItem: createTypography(
    "1rem",
    fontWeight[1],
    text.primary,
    text.primary,
    "none"
  ),
  menu: createTypography(
    "1rem",
    fontWeight[1],
    text.primary,
    text.primary,
    "none"
  ),
  dropdown: createTypography(
    "1rem",
    fontWeight[1],
    text.primary,
    text.primary,
    "none"
  ),
  tab: createTypography(
    "1rem",
    fontWeight[2],
    primary.main,
    primary.contrastText,
    "none"
  ),
  modal: createTypography(
    "1rem",
    fontWeight[1],
    text.primary,
    text.primary,
    "none"
  ),
};
