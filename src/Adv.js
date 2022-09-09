import {
  Box,
  Typography,
} from "@mui/material";
import * as React from "react";

function Adv() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h5" sx={rowStyle}>Advantage Flight Plan</Typography>
      <br />
      <Typography variant="body1">Make an appointment at <a href="https://teachmore.org/jeffreytrail/students/" target="_blank" rel="noreferrer">https://teachmore.org/jeffreytrail/students/</a></Typography>
      <Typography variant="body1">Make sure to make an appointment for both Wednesday and Thursday and to check your teacher's advantage offering below.</Typography>
      <br />
      <iframe title="Advantage Itinerary" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSwlxnBZge1D9VDll4722dUVfLXyWX-WeY7B0PbQ8J7YSs0Fdh_llOTq3IzC_F51yy1lx6MutcxokPI/pubhtml?widget=true&amp;headers=false" width="100%" height="1500">
      </iframe>
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
