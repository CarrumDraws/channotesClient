import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";

function Home() {
  return (
    <Box>
      <TopbarBuffer />
      Home
    </Box>
  );
}

export default Home;
