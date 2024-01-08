import { palette } from "../palette";

const greyColor = palette.palette.default.grey[400];
const transition = "0.3s";

export const textareaAutosizeStyles = {
  root: {
    margin: "8px",
    padding: "8px",
    border: `1px solid ${greyColor}`,
    borderRadius: "4px",
    transition: transition,
  },
};
