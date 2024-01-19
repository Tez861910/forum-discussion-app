import { palette } from "./palette";

const { primary, secondary, tertiary, quaternary, text } =
  palette.palette.default;

const createTypography = (
  fontSize,
  fontWeight,
  color,
  contrastText,
  textTransform = "none"
) => ({
  fontSize,
  fontWeight,
  color,
  contrastText,
  textTransform,
});

export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: createTypography("2rem", 700, primary.main, primary.contrastText),
  h2: createTypography("1.5rem", 500, secondary.main, secondary.contrastText),
  h3: createTypography("1.2rem", 400, tertiary.main, tertiary.contrastText),
  h4: createTypography("1rem", 400, quaternary.main, quaternary.contrastText),
  h5: createTypography("0.875rem", 400, primary.main, primary.contrastText),
  h6: createTypography("0.75rem", 300, secondary.main, secondary.contrastText),
  subtitle1: createTypography(
    "1rem",
    400,
    tertiary.main,
    tertiary.contrastText
  ),
  subtitle2: createTypography(
    "0.875rem",
    400,
    quaternary.main,
    quaternary.contrastText
  ),
  body1: createTypography("1rem", 400, text.primary),
  body2: createTypography("0.875rem", 400, text.primary),
  button: createTypography(
    "0.875rem",
    500,
    primary.main,
    primary.contrastText,
    "uppercase"
  ),
  caption: createTypography("0.75rem", 400, text.primary),
  overline: createTypography("0.75rem", 400, text.primary, null, "uppercase"),
  link: createTypography("1rem", 400, primary.main, primary.contrastText),
  tooltip: createTypography("0.75rem", 300, text.primary, text.primary),
  alert: createTypography("1rem", 500, primary.main, primary.contrastText),
  badge: createTypography(
    "0.75rem",
    700,
    primary.main,
    primary.contrastText,
    "uppercase"
  ),
  listItem: createTypography("1rem", 400, text.primary, text.primary),
  menu: createTypography("1rem", 400, text.primary, text.primary),
  dropdown: createTypography("1rem", 400, text.primary, text.primary),
  tab: createTypography("1rem", 500, primary.main, primary.contrastText),
  modal: createTypography("1rem", 400, text.primary, text.primary),
};
