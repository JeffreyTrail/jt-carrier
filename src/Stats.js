import {
  Box,
  Typography,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from "@mui/material";
import * as React from "react";

function Stats() {
  const [letters, setLetters] = React.useState({
    w: 0,
    i: 0,
    n: 0,
    g: 0,
    s: 0
  });
  const [top, setTop] = React.useState("");
  const [errmsg, setErrmsg] = React.useState("");
  const [beg, setBeg] = React.useState("---");
  const [end, setEnd] = React.useState("---");
  const [prize, setPrize] = React.useState("---");

  const updateStats = () => {
    try {
      fetch("https://wings-971b6-default-rtdb.firebaseio.com/letters.json")
        .then((response) => response.json())
        .then((data) => setLetters(data));

      fetch("https://wings-971b6-default-rtdb.firebaseio.com/top.json")
        .then((response) => response.json())
        .then((data) => setTop(data));

    } catch (err) {
      setErrmsg("Something went wrong...our server might be busy!");
    }
  };

  // updateStats();
  React.useEffect(() => {
    setInterval(updateStats, 60000);

    updateStats();
    fetch("https://wings-carrier.herokuapp.com/dates/current")
    .then((response) => response.json())
    .then((data) => {
      setBeg(data.beg);
      setEnd(data.end);
      setPrize(data.prize);
    });
  }, []);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h5" sx={rowStyle}>WINGS Ticket Stats</Typography>
      <Typography variant="h6">Ticket count for the week from {beg} to {end}</Typography>
      <Typography variant="h6">{errmsg}</Typography>

      <TableContainer component={Paper} sx={rowStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{  fontWeight: "bold" }}
                align="center"
              >
                W
              </TableCell>
              <TableCell
                sx={{  fontWeight: "bold" }}
                align="center"
              >
                I
              </TableCell>
              <TableCell
                sx={{  fontWeight: "bold" }}
                align="center"
              >
                N
              </TableCell>
              <TableCell
                sx={{  fontWeight: "bold" }}
                align="center"
              >
                G
              </TableCell>
              <TableCell
                sx={{  fontWeight: "bold" }}
                align="center"
              >
                S
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell sx={{ }} align="center">
                {letters["w"]}
              </TableCell>
              <TableCell sx={{ }} align="center">
                {letters["i"]}
              </TableCell>
              <TableCell sx={{ }} align="center">
                {letters["n"]}
              </TableCell>
              <TableCell sx={{ }} align="center">
                {letters["g"]}
              </TableCell>
              <TableCell sx={{ }} align="center">
                {letters["s"]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">This week's homeroom drawing prize is: {prize}</Typography>

      <Typography variant="h6" sx={rowStyle}>
        This trimester's cutoff for TOP 25%: {top} tickets
      </Typography>

      {/*
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350, marginTop: 5 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Teacher
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Count
              </TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {staff.map((member) => (
              <TableRow>
                <TableCell>{member.label}</TableCell>
                <TableCell>{Math.floor(Math.random() * 30) + 20}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      */}
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Stats;
