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
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
  Chip,
  Collapse,
  Skeleton,
  IconButton,
} from "@mui/material";
import * as React from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function Dash(props) {
  const [name, setName] = React.useState("Log In");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [tkts, setTkts] = React.useState([]);
  const [status, setStatus] = React.useState(0);
  const [cnt, setCnt] = React.useState(-1);
  const [hist, setHist] = React.useState(false);

  const submit = () => {
    setSubmitted(true);
    fetch("https://wings-carrier.herokuapp.com/lookup/" + props.sid)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(false); // stop loading
        setStatus(data.status);
        if (data.status === 0) {
          setTkts(data.tkts);
          setCnt(data.cnt);
          setName(data.name);
          props.setWallet(data.wallet);
          props.setNotif(["success", "Successfully signed in as " + data.name]);
        } else if (data.status === 1) {
          props.setNotif(["error", "We couldn't find someone with that ID."]);
        }
      });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "72px",
      }}
    >
      <Box sx={rowStyle}>
        <Typography variant="h5">{name}</Typography>
      </Box>

      {name === "Log In" ? (
        <Box sx={{ margin: "auto" }}>
          <Typography paragraph>
            Log in to use WINGStore, save your ID, and more.
          </Typography>

          <Stack spacing={1}>
            {/* <TextField required label="IUSD email" value={email} size="small" /> */}

            <TextField
              error={(submitted && props.sid === "") || status === 1}
              required
              label="Student ID"
              value={props.sid}
              onChange={(e) => {
                props.setSid(e.target.value);
              }}
              size="small"
            />

            {/* <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Click here to save your student ID. Only do this on your own computer"
              />
            </FormGroup> */}

            <Button onClick={submit} fullWidth variant="contained">
              log in
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ margin: "auto" }}>
          <Typography paragraph>Welcome to your dashboard!</Typography>
          <Stack spacing={1} direction="row">
            <Chip
              avatar={<Avatar>{props.wallet}</Avatar>}
              label="Wallet"
              variant="outlined"
            />
            <Chip
              avatar={<Avatar>{cnt}</Avatar>}
              label={cnt === 1 ? "Ticket in Tri II" : "Tickets in Tri II"}
              variant="outlined"
            />
          </Stack>

          <Button
            onClick={() => setHist(!hist)}
            endIcon={hist ? <ExpandLess /> : <ExpandMore />}
            variant="outlined"
            fullWidth
            sx={rowStyle}
            disabled={tkts.length === 0}
          >
            Load History
          </Button>
          {tkts.length === 0 ? (
            <Typography paragraph sx={{ margin: 5, textAlign: "center" }}>
              You haven't submitted any tickets...yet.
            </Typography>
          ) : (
            <Collapse in={hist} timeout="auto" unmountOnExit>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  flexGrow: "row",
                  display: "flex",
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
              </TableContainer>
            </Collapse>
          )}
        </Box>
      )}
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
