import { Box, Typography } from "@mui/material";
import * as React from "react";

function Adv() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={rowStyle}>
        Advantage Flight Plan
      </Typography>
      <br />
      <Typography paragraph>
        Make an appointment at{" "}
        <a
          href="https://teachmore.org/jeffreytrail/students/"
          target="_blank"
          rel="noreferrer"
        >
          https://teachmore.org/jeffreytrail/students/
        </a>
      </Typography>
      <Typography paragraph>
        Make sure to make an appointment for both Wednesday and Thursday and to
        check your teacher's advantage offering below.
      </Typography>
      <br />
      <iframe
        title="Advantage Itinerary"
        src="https://docs.google.com/spreadsheets/d/14TOkmeMdiYgZrUhmWvYWML4MHOM_v3X1VlHdBLzx3_k/pubhtml?widget=true&amp;headers=false"
        width="100%"
        height="1600"
      ></iframe>
      <br />
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Adv;
