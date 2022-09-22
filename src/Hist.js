import {
  Box,
  Typography,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import * as React from "react";

function Hist() {
  const [tkts, setTkts] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState(0);
  const [sid, setSid] = React.useState("");

  const submit = () => {
    setSubmitted(true);
    fetch("https://wings-carrier.herokuapp.com/lookup/"+sid)
    .then((response) => response.json())
    .then((data) => {
      setSubmitted(false);
      setStatus(data.status);
      if (data.status === 0) {
        setTkts(data.tkts);
      }
    });
  }

  // React.useEffect(() => {
  //   const enterToSubmit = event => {
  //     console.log('User pressed: ', event.key);
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       submit();
  //     }
  //   };
  //
  //   document.addEventListener('keydown', enterToSubmit);
  //
  //   return () => {
  //     document.removeEventListener('keydown', enterToSubmit);
  //   };
  // }, []);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={rowStyle}>
        <Typography variant="h5">Tickets History</Typography>
        <Chip label="BETA" color="primary" variant="outlined" size="small" sx={{marginLeft: 2}}/>
      </Box>

      <Typography variant="h6">Enter your 9-digit student ID to see a record of all the WINGS tickets you've submitted</Typography>

      <Box sx={rowStyle}>
        <TextField
          error={(submitted && sid === "") || status === 1}
          required
          label="IUSD student ID"
          value={sid}
          onChange={(e) => {setSid(e.target.value)}}
          sx={{
            flexGrow: 1,
            marginRight: 3
          }}
        />

      <Button onClick={submit} variant="outlined">
        submit
      </Button>
      </Box>

      <Box >
      {(status === 1) ? (
        <Typography variant="body2" color="#f44336">
          We couldn't find a student with that ID number. Did you type it in correctly?
          If so, submit a report form!
        </Typography>
      ) : (
        <React.Fragment />
      )}

      </ Box>


      <TableContainer component={Paper} sx={{
        width: "100%",
        flexGrow: "row",
        display: "flex",
        marginTop: 3,
        marginBottom: 5,
      }}>
        {submitted ? (
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{  fontWeight: "bold" }}
                  align="center"
                >
                  Ticket Code
                </TableCell>
                <TableCell
                  sx={{  fontWeight: "bold" }}
                  align="center"
                >
                  Submit Time
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tkts.map((t) => {
                return (
                <TableRow>
                  <TableCell sx={{ }} align="center">
                    {t["code"]}
                  </TableCell>
                  <TableCell sx={{ }} align="center">
                    {t["time"]}
                  </TableCell>
                </TableRow>
              )
              })}
            </TableBody>
          </Table>
        )}
        </TableContainer>
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Hist;
