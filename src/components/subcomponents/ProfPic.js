import React from "react";
import { Avatar, useTheme } from "@mui/material";

// Takes in Image URL, initials, and Size (l, m, s)
function ProfPic({ url, initials, type }) {
  const { palette } = useTheme();
  let size = type === "l" ? "75px" : type === "m" ? "35px" : "25px";

  return (
    <Avatar
      src={url}
      alt={initials}
      sx={{
        width: size,
        height: size,
        bgcolor: palette.tertiary.textSub,
      }}
    >
      {initials}
    </Avatar>
  );
}

export default ProfPic;
