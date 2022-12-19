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
} from "@mui/material";
import * as React from "react";

function Dash() {
  const [name, setName] = React.useState("Sign In");
  // const [status, setStatus] = React.useState(0);
  const [sid, setSid] = React.useState("");
  const [cnt, setCnt] = React.useState(-1);

  const submit = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 48,
        right: 50,
      }}
    >
      <Box sx={rowStyle}>
        <Typography variant="h5">{name}</Typography>
      </Box>

      <Typography paragraph>
        Sign in to use WINGStore, save your ID, and more.
      </Typography>

      <Box sx={rowStyle}>
        <TextField
          // error={( )}
          required
          label="student ID"
          value={sid}
          onChange={(e) => {
            setSid(e.target.value);
          }}
          sx={{
            flexGrow: 1,
            marginRight: 3,
          }}
        />

        <Button onClick={submit} variant="outlined">
          submit
        </Button>
      </Box>

      {/* {cnt === -1 ? (
        <React.Fragment />
      ) : (
        <Typography variant="h6" sx={{ marginTop: 5 }}>
          You have submitted {cnt} tickets this trimester (excluding orange
          tickets).
        </Typography>
      )}

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          flexGrow: "row",
          display: "flex",
          marginTop: 3,
          marginBottom: 5,
        }}
      >
        {submitted ? (
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Ticket Code
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Submit Time
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tkts.map((t) => {
                return (
                  <TableRow>
                    <TableCell sx={{}} align="center">
                      {t["code"]}
                    </TableCell>
                    <TableCell sx={{}} align="center">
                      {t["time"]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer> */}
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Dash;
