import { styled } from "@mui/system";
import { Box, Typography, useTheme } from "@mui/material";

const TestingProps = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "dark" && prop !== "border" && prop !== "sx",
})(({ dark, border, theme }) => ({
  backgroundColor: dark ? theme.palette.grey[900] : theme.palette.grey[100],
  color: dark ? theme.palette.grey[100] : theme.palette.grey[900],
  border: border ? `1rem solid ${theme.palette.primary.main}` : "none",
}));

export default TestingProps;
