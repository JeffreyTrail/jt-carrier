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
} from "@mui/material";
import * as React from "react";

function Dash(props) {
  const [name, setName] = React.useState("Log In");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [tkts, setTkts] = React.useState([]);
  const [status, setStatus] = React.useState(0);
  const [cnt, setCnt] = React.useState(-1);

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
        }
      });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 48,
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
              // error={( )}
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
        <Typography variant="h2">{props.wallet} Tickets</Typography>
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
