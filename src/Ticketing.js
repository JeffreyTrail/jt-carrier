import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Modal,
  Typography
} from "@mui/material";
import * as React from "react";
// import ticket_sample from "../public/ticket_sample.png";

function Ticketing() {
  const [code, setCode] = React.useState("");
  const [sid, setSid] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [wings, setWings] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [result, setResult] = React.useState(-1);
  const [errmsg, setErrmsg] = React.useState("");

  const handleSid = (e) => {
    setSid(e.target.value);
  };

  const handleCode = (e) => {
    let newCode = e.target.value;
    if (newCode.includes("-")){
      newCode = newCode.replaceAll("-", "");
    }
    setCode(newCode);
  }

  const lookup = () => {
    const url =
      "https://wings-carrier.herokuapp.com/submit/" +
      teacher +
      "/" +
      wings +
      "/" +
      sid +
      "/" +
      code;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.rcode);
        setErrmsg(data.msg);
      });
  };

  const submit = () => {
    setSubmitted(true);
    if (code !== "" && sid !== "" && teacher !== "" && wings !== "") {
      try {
        lookup();
      } catch {
        setResult(-2);
        setErrmsg(
          "Hmm looks like there is something wrong with the server; maybe it's busy. Try again later. If this persists, please let Mr. Gu know."
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Modal open={result !== -1} onClose={() => setResult(-1)}>
        {result === 0 ? (
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Submission Accepted
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your WINGS ticket submission has been submitted. Thank you for
              exhibiting WINGS! Pay attention to ASB announcements this week to
              see if you've won!
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Keep up the good work! Click away to submit another ticket.
            </Typography>
          </Box>
        ) : (
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Invalid Ticket Submission
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {errmsg}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              If you believe the error you received above is a mistake with the
              system, please fill out the help form below.
              <hr />
              <a href="https://forms.gle/t9R29o6ZJXDM7NE37" target="_blank" rel="noreferrer">
              Report an Issue!</a>
            </Typography>
          </Box>
        )}
      </Modal>

      {/**************** Begin Submission Form****************/}
      <Box component="form" sx={{
        margin: "auto",
        // width: "50%",
        display: "flex",
        flexDirection: "column"
      }}>
        <Typography variant="h5" sx={rowStyle} >
          Submit your WINGS ticket
        </Typography>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            What is the 9 digit code at the top of your ticket? (Omit dashes)
          </Typography>
          <TextField
            required
            error={submitted && (code === "" || isNaN(code))}
            label="Ticket Code"
            value={code}
            onChange={handleCode}
            sx={{width:"60%"}}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            Which WINGS letter did you demonstrate?
          </Typography>

          <FormControl sx={{width:"60%"}}>
            <RadioGroup
              aria-labelledby="wings-choice"
              // error={submitted && wings === ""}
              name="wings-choice"
              value={wings}
              onChange={(event) => {setWings(event.target.value)}}
            >
              <FormControlLabel
                value="w"
                control={<Radio />}
                label="Willing to take a risk"
              />
              <FormControlLabel
                value="i"
                control={<Radio />}
                label="Integrity in action"
              />
              <FormControlLabel
                value="n"
                control={<Radio />}
                label="Nobility in thought"
              />
              <FormControlLabel
                value="g"
                control={<Radio />}
                label="Generous in spirit"
              />
              <FormControlLabel
                value="s"
                control={<Radio />}
                label="Self-directed"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>Who issued you the ticket?</Typography>
          <Autocomplete
            id="teacher-select"
            value={teacher}
            forcePopupIcon={false}
            onChange={(event, newValue) => {
              setTeacher(newValue.label);
            }}
            options={staff}
            sx={{width:"60%"}}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={submitted && teacher === ""}
                label="Teacher Name"
              />
            )}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>What is your IUSD student ID?</Typography>
          <TextField
            error={submitted && sid === ""}
            required
            label="IUSD student ID"
            value={sid}
            onChange={handleSid}
            sx={{width:"60%"}}
          />
        </Box>

        <Button onClick={submit} fullWidth={true} sx={rowStyle} variant="contained">
          submit
        </Button>
      </Box>

      {/*
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 10
        }}
      >
        <Typography variant="h6">Sample Ticket</Typography>
        <img src={ticket_sample} alt="sample WINGS ticket" />
      </Box>
      */}
    </React.Fragment>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

const promptStyle = {
  width: "39%",
  marginRight: 1,
}

const staff = [
  { label: "ALLEN" },
  { label: "ANGEL" },
  { label: "BABE" },
  { label: "BARCENAS" },
  { label: "BIRCHLER" },
  { label: "BOSSHART" },
  { label: "BROWN" },
  { label: "BUTLER" },
  { label: "BYRNE" },
  { label: "CHANG" },
  { label: "CHITTAPHONG" },
  { label: "CLAPPER" },
  { label: "COLLINS" },
  { label: "DEANE" },
  { label: "DIFRANCESCO" },
  { label: "EISMAN" },
  { label: "FORD" },
  { label: "GARCIA" },
  { label: "GEORGINO" },
  { label: "GRAHAM" },
  { label: "GU" },
  { label: "GUADERRAMA" },
  { label: "HALL" },
  { label: "HARRISON" },
  { label: "HONG" },
  { label: "HOUGH" },
  { label: "IGNACIO" },
  { label: "JONG" },
  { label: "KAHELIN" },
  { label: "KOZUKI" },
  { label: "KUBO" },
  { label: "LAMPERT" },
  { label: "LEAVEY" },
  { label: "LELLIOTT" },
  { label: "LEVENSAILOR" },
  { label: "MASCIEL" },
  { label: "MATIONG" },
  { label: "MELGOZA" },
  { label: "MONTGOMERY" },
  { label: "MUNOZ" },
  { label: "NGUYEN" },
  { label: "PATRICK" },
  { label: "PIPP" },
  { label: "RANGEL" },
  { label: "SEILHAN" },
  { label: "SOLIDAY" },
  { label: "TOMBRELLO" },
  { label: "TRAPP" },
  { label: "VREELAND" },
  { label: "WARE" },
];

export default Ticketing;
