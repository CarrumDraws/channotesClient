import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import Thumbnail from "./Thumbnail.js";
import cleanDate from "./helperFuncs/cleanDate.js";

function Note({ data, select, toggleSelected }) {
  const { palette, transitions } = useTheme();
  let {
    id,
    chan_id,
    folder_id,
    title,
    subtitle,
    date_created,
    date_edited,
    pinned,
    locked,
  } = data;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "3rem",
        width: "100%",
        backgroundColor: palette.tertiary.main,
      }}
    >
      {select && (
        <Checkbox
          color="secondary"
          size="medium"
          icon={<RadioButtonUncheckedOutlinedIcon />}
          checkedIcon={<RadioButtonCheckedOutlinedIcon />}
          onChange={() => {
            toggleSelected(id);
          }}
          disableRipple={true}
        />
      )}
      <LockOutlinedIcon
        sx={{
          color: palette.tertiary.text,
          width: "0.75rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          opacity: locked ? "1" : "0",
        }}
      />
      <Box
        sx={{
          flexGrow: "99",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography variant="med">{title}</Typography>
        <Typography variant="exSmall" noWrap>
          {cleanDate(date_edited)}{" "}
          {subtitle ? subtitle : "Preview Text Hereeeeeeeeeeeeeeeeeeeeeeeeeee"}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        <Thumbnail type="m" />
      </Box>
    </Box>
  );
}

export default Note;
