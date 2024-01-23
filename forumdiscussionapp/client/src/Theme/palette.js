const createColor = (main, contrastText) => ({ main, contrastText });

const commonColors = {
  primary: createColor("#1a237e", "#ffffff"), // Indigo
  secondary: createColor("#ff9800", "#000000"), // Orange
  tertiary: createColor("#4caf50", "#000000"), // Green
  quaternary: createColor("#f44336", "#ffffff"), // Red
  quinary: createColor("#9c27b0", "#ffffff"), // Purple
  senary: createColor("#03a9f4", "#000000"), // Light Blue
  error: { main: "#f44336" }, // Red
  warning: { main: "#ff9800" }, // Orange
  info: { main: "#2196f3" }, // Blue
  success: { main: "#4caf50" }, // Green
};

const commonGrey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
};

const commonText = {
  primary: "#000000",
  secondary: "#212121",
  tertiary: "#ffffff",
  quaternary: "#000000",
  quinary: "#ffffff",
  senary: "#ffffff",
  disabled: "#9e9e9e",
  hint: "#757575",
};

const commonBackground = {
  default: "#fafafa",
  paper: "#f5f5f5",
};

const commonAction = {
  active: "#1e88e5",
  hover: "#e0e0e0",
  hoverOpacity: 0.08,
  selected: "#f5f5f5",
  selectedOpacity: 0.16,
  disabled: "#9e9e9e",
  disabledBackground: "#e0e0e0",
  disabledOpacity: 0.38,
  focus: "#757575",
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
};

export const palette = {
  mode: "light",
  default: {
    ...commonColors,
    grey: commonGrey,
    text: commonText,
    divider: "#bdbdbd",
    background: commonBackground,
    action: commonAction,
  },
  dark: {
    ...commonColors,
    grey: { ...commonGrey, 50: "#212121", 900: "#ffffff" },
    text: commonText,
    divider: "#616161",
    background: { ...commonBackground, default: "#212121", paper: "#424242" },
    action: commonAction,
  },
};
