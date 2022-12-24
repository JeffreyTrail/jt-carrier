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
} from "@mui/material";
import * as React from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function Dash(props) {
  const [name, setName] = React.useState("Log In");
  // const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [tkts, setTkts] = React.useState([]);
  const [status, setStatus] = React.useState(0);
  const [cnt, setCnt] = React.useState(-1);
  const [hist, setHist] = React.useState(false);
  const [remem, setRemem] = React.useState(false);

  const submit = () => {
    setSubmitted(true);
    fetch("https://wings-carrier.herokuapp.com/lookup/" + props.sid)
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(false); // stop loading
        setStatus(data.status);
        if (data.status === 0) {
          setTkts(data.tkts);
          setCnt(data.cnt);
          setName(data.name);

          props.setWallet(data.wallet);
          props.setNotif(["success", "Successfully signed in as " + data.name]);

          if (remem && typeof Storage !== "undefined") {
            localStorage.setItem("sid", props.sid);
          }
        } else if (data.status === 1) {
          props.setNotif(["error", "We couldn't find someone with that ID."]);
        }
      });
  };

  React.useEffect(() => {
    if (props.sid !== "") submit(); // Load saved SID
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    setName("Log In");
    props.setSid("");
    localStorage.setItem("sid", "");
    setSubmitted(false);
    setStatus(0);
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
            Log in to use WINGStore, save your ID when submitting tickets, and
            more.
          </Typography>

          <Stack spacing={1}>
            {/* Add second field to cross check network id in front of email */}
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
          <Typography paragraph>Welcome to your dashboard!</Typography>
          <Chip
            avatar={<Avatar>{props.wallet}</Avatar>}
            label="Wallet"
            variant="outlined"
            sx={{
              height: 42,
              borderRadius: "999px",
              fontSize: "1rem",
              mb: 1,
              mr: 1,
              "& .MuiChip-avatar": {
                fontSize: "1.1rem",
                height: "32px",
                width: "32px",
              },
            }}
          />
          <Chip
            avatar={<Avatar>{cnt}</Avatar>}
            label={cnt === 1 ? "Ticket in Tri II" : "Tickets in Tri II"}
            variant="outlined"
            sx={{
              height: 42,
              borderRadius: "999px",
              fontSize: "1rem",
              mb: 1,
              "& .MuiChip-avatar": {
                fontSize: "1.1rem",
                height: "32px",
                width: "32px",
              },
            }}
          />

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
                      {tkts.map((t, i) => {
                        return (
                          <TableRow key={i}>
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

export default Dash;
