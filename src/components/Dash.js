import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormGroup,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { catalogue } from "./Catalogue";

function Dash({ sid, setSid, wallet, setWallet, setNotif }) {
  const [name, setName] = React.useState("Log In");
  const [email, setEmail] = React.useState("");
  const [chance, setChance] = React.useState("calculate");

  const [submitted, setSubmitted] = React.useState(false);
  const [remem, setRemem] = React.useState(false);

  const [tkts, setTkts] = React.useState([]);
  const [purch, setPurch] = React.useState([]);
  const [status, setStatus] = React.useState(0);
  const [cnt, setCnt] = React.useState(-1);

  const [thist, setThist] = React.useState(false);
  const [phist, setPhist] = React.useState(false);

  const submit = () => {
    // Submit is used to catch empty fields (i.e. user is done typing)
    setSubmitted(true);
    // Skip auth if invalid inputs
    if (sid === "" || isNaN(sid) || !validateEmail(email)) return;
    // Authenticate user's SID and NID (from email)
    fetch(
      "https://wings-carrier.herokuapp.com/authenticate/" +
        sid +
        "/" +
        email.substring(0, email.indexOf("@"))
    )
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(false); // stop loading
        setStatus(data.status);
        if (data.status === 0) {
          setNotif(["success", "Successfully signed in."]);

          // Remember this device for user; stay signed in
          if (remem && typeof Storage !== "undefined") {
            localStorage.setItem("sid", sid);
          }

          // User is legit & Refresh user data
          getUserData();
        } else if (data.status === 1) {
          setNotif(["error", "We couldn't find someone with that ID."]);
        } else if (data.status === 2) {
          setNotif(["error", "Your email does not match that ID."]);
        }
      });
  };

  const chanceMe = () => {
    fetch("https://wings-carrier.herokuapp.com/chance/" + sid)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          setChance(data.chance);
        } else if (data.status === 1) {
          setNotif([
            "error",
            "Incorrect ID. Please log out and try logging back in again.",
          ]);
        }
      });
  };

  const getUserData = () => {
    // Update data in dashboard
    fetch("https://wings-carrier.herokuapp.com/lookup/" + sid)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          // All good
          setTkts(data.tkts);
          setPurch(data.purch);
          setCnt(data.cnt);
          setName(data.name);
          setWallet(data.wallet);
          // setNotif(["success", "Successfully signed in as " + data.name]);
        } else if (data.status === 1) {
          setNotif([
            "error",
            "Incorrect ID. Please log out and try logging back in again.",
          ]);
        }
      });
  };

  const validateEmail = (email) => {
    if (email === "") {
      return false;
    }
    if (!email.includes("@iusd.org")) {
      return false;
    }
    if (email.includes(" ")) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    // Load saved SID on initial render or on purchase (wallet change)
    if (sid !== "") getUserData();
    // eslint-disable-next-line
  }, [wallet]);

  const logout = () => {
    // Reset everything
    setName("Log In");
    setWallet(-1);
    setSid("");
    localStorage.setItem("sid", "");
    setSubmitted(false);
    setStatus(0);
    setNotif(["success", "Log out successful :)"]);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "72px",
        marginRight: 1,
        marginBottom: 3,
      }}
    >
      <Box sx={rowStyle}>
        <Typography variant="h5">{name}</Typography>
      </Box>

      {name === "Log In" ? (
        <Box sx={{ margin: "auto" }}>
          {/* ******************************** SIGN IN PAGE ******************************** */}
          <Typography paragraph>
            Log in to use WINGStore, save your ID when submitting tickets, and
            more.
          </Typography>

          <Stack spacing={1}>
            <TextField
              error={(submitted && (sid === "" || isNaN(sid))) || status === 1}
              required
              label="Student ID Number"
              value={sid}
              onChange={(e) => {
                setSid(e.target.value);
              }}
              helperText={
                sid !== "" && isNaN(sid) // is Not a Number
                  ? "Invalid ID: Your 9 digit student ID should not contain any letters. It should look like '123456789'."
                  : ""
              }
              size="small"
            />

            <TextField
              error={(submitted && !validateEmail(email)) || status === 2}
              required
              label="IUSD email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              helperText={
                email !== "" && !validateEmail(email)
                  ? "Invalid email: Please use your iusd.org email. E.g. 26JonSmith@iusd.org."
                  : ""
              }
              size="small"
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remem}
                    onChange={(e) => setRemem(e.target.checked)}
                  />
                }
                label="Stay Logged In"
              />
              <Typography variant="body2">
                Check this only on your own device.
              </Typography>
            </FormGroup>

            <Button onClick={submit} fullWidth variant="contained">
              log in
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ margin: "auto" }}>
          {/* ********************************** SIGNED IN ********************************** */}
          <Typography paragraph>Welcome to your dashboard!</Typography>
          <Chip
            avatar={<Avatar>{wallet}</Avatar>}
            label="Wallet"
            variant="outlined"
            sx={largeChip}
          />
          <Chip
            avatar={<Avatar>{cnt}</Avatar>}
            label={cnt === 1 ? "Ticket in Tri II" : "Tickets in Tri II"}
            variant="outlined"
            sx={largeChip}
          />

          <Divider />

          <Typography variant="body2">
            Your chances of winning next Tuesday's homeroom drawing:
          </Typography>
          {/* Generate Chances of Winning */}
          <Button
            onClick={chanceMe}
            variant="text"
            fullWidth
            disabled={chance !== "calculate"}
          >
            {chance}
          </Button>

          <Divider />

          <Button
            onClick={() => setThist(!thist)}
            endIcon={thist ? <ExpandLess /> : <ExpandMore />}
            variant="outlined"
            fullWidth
            disabled={tkts.length === 0}
            sx={{ marginTop: 1 }}
          >
            Ticket History
          </Button>
          {tkts.length === 0 ? (
            <Typography paragraph sx={{ margin: 5, textAlign: "center" }}>
              You haven't submitted any tickets...yet.
            </Typography>
          ) : (
            <Collapse in={thist} timeout="auto" unmountOnExit>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  flexGrow: "row",
                  display: "flex",
                  overflowX: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Ticket Code
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Submit Date
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tkts.map((t, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell align="center">{t["code"]}</TableCell>
                          <TableCell align="center">{t["time"]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          )}

          <Button
            onClick={() => setPhist(!phist)}
            endIcon={phist ? <ExpandLess /> : <ExpandMore />}
            variant="outlined"
            fullWidth
            disabled={purch.length === 0}
            sx={{ marginTop: 1 }}
          >
            Purchase History
          </Button>
          {purch.length === 0 ? (
            <Typography paragraph sx={{ margin: 2, textAlign: "center" }}>
              You haven't purchased anything...yet.
            </Typography>
          ) : (
            <Collapse in={phist} timeout="auto" unmountOnExit>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  flexGrow: "row",
                  display: "flex",
                  overflowX: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Item
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {purch.map((t, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell align="center">
                            {catalogue[parseInt(t["itemn"])]["name"]}
                          </TableCell>
                          <TableCell align="center">{t["time"]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          )}

          <Button
            fullWidth
            sx={{ marginTop: 1 }}
            color="secondary"
            variant="outlined"
            onClick={logout}
          >
            log out
          </Button>
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

const largeChip = {
  height: 35,
  borderRadius: "999px",
  fontSize: "0.9rem",
  mb: 1,
  "& .MuiChip-avatar": {
    fontSize: "1.1rem",
    height: "25px",
    width: "25px",
  },
};

export default Dash;
