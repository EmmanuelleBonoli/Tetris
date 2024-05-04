import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#227093",
    },
    "&.Mui-focused .MuiSvgIcon-root": {
      color: "#227093",
    },
    "&:hover fieldset": {
      borderColor: "#227093",
    },
  },
});
