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
  Typography,
} from "@mui/material";
import * as React from "react";
// import ticket_sample from "../public/ticket_sample.png";

const OPREFIXES = "ABCDEFGHJKabcdefghjk";

function Ticketing(props) {
  const [code, setCode] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [wings, setWings] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [result, setResult] = React.useState(-1);
  const [errmsg, setErrmsg] = React.useState("");
  const [flavor, setFlavor] = React.useState("r");
  // flavor is  type & validity of code: o is orange, r is regular, i is invalid

  let localLastTeachers = localStorage.getItem("lastTeachers");
  if (localLastTeachers !== null) {
    localLastTeachers = localLastTeachers
      .split(",")
      .filter((teacher) => teacher !== "")
      .reverse();
    for (let i = 0; i < localLastTeachers.length; i++) {
      staff.splice(
        staff.findIndex((teacher) => teacher.label === localLastTeachers[i]),
        1
      );
      staff.unshift({ label: localLastTeachers[i] });
    }
  }

  const handleLastTeachers = (teacher) => {
    let teacherData = localStorage.getItem("lastTeachers");
    if (teacherData === null) {
      localStorage.setItem("lastTeachers", teacher);
    } else if (teacherData !== null) {
      teacherData = teacherData.split(",");
      if (teacherData.includes(teacher)) {
        teacherData.splice(teacherData.indexOf(teacher));
      }
      teacherData.unshift(teacher);
      teacherData.splice(3);
      localStorage.setItem("lastTeachers", teacherData);
    }
  };

  const handleCode = (e) => {
    let newCode = e.target.value;
    if (newCode.includes("-")) {
      newCode = newCode.replaceAll("-", "");
    }
    if (isNaN(newCode)) {
      // is Not-a-Number; has letters
      let pref = newCode.charAt(0);
      if (OPREFIXES.includes(pref) && !isNaN(newCode.substring(1, 9))) {
        // only the first char is an acceptable letter for O tickets
        setFlavor("o");
      } else {
        // invalid ticket (letters in bad places)
        setFlavor("i");
      }
    } else {
      // no letters, all numbers
      setFlavor("r");
    }
    setCode(newCode);
  };

  const URLBASE = "https://wings-carrier.herokuapp.com/";

  const lookup = () => {
    try {
      let url = URLBASE;
      if (flavor === "r") {
        url += "submit/" + teacher + "/" + wings + "/" + props.sid + "/" + code;
      } else if (flavor === "o") {
        url += "orange/" + props.sid + "/" + code;
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setResult(data.rcode);
          setErrmsg(data.msg);
          if (data.rcode === 0) {
            setCode("");
            setWings("");
            setTeacher("");
            setSubmitted(false);
            setFlavor("r");
            props.setWallet(props.wallet + 1);
            props.setNotif(["success", "Ticket successfully submitted!"]);
            handleLastTeachers(teacher);
          }
        });
    } catch {
      setResult(-2);
      setErrmsg(
        "Hmm looks like there is something wrong with the server; maybe it's busy. Try again later. If this persists, please let Mr. Gu know."
      );
      props.setNotif(["error", "Something's wrong with the server."]);
    }
  };

  const submit = () => {
    setSubmitted(true);
    if (flavor === "o") {
      if (code.length !== 9) {
        setFlavor("i");
      } else if (props.sid !== "") {
        lookup();
      }
    } else if (flavor === "r") {
      if (code.length !== 9) {
        setFlavor("i");
      } else if (props.sid !== "" && teacher !== "" && wings !== "") {
        lookup();
      }
    }
  };

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      // 13 is the keycode for enter
      submit(); // run the submit function
    }
  });

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
              exhibiting WINGS!
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
              <a
                href="https://forms.gle/t9R29o6ZJXDM7NE37"
                target="_blank"
                rel="noreferrer"
              >
                Report an Issue!
              </a>
            </Typography>
          </Box>
        )}
      </Modal>

      {/**************** Begin Submission Form****************/}
      <Box
        component="form"
        sx={{
          margin: "auto",
          // width: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={rowStyle}>
          Submit your WINGS ticket
        </Typography>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            What is the 9 digit code at the top of your ticket? (Omit dashes)
          </Typography>
          <TextField
            required
            error={flavor === "i"}
            label="Ticket Code"
            value={code}
            helperText={
              flavor === "r"
                ? ""
                : flavor === "o"
                ? "Orange ticket"
                : "Invalid code: Ticket code must be 9 characters, with at most 1 letter"
            }
            onChange={handleCode}
            sx={{ width: "60%" }}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            Which WINGS letter did you demonstrate?
          </Typography>

          <FormControl sx={{ width: "60%" }}>
            <RadioGroup
              aria-labelledby="wings-choice"
              // error={submitted && wings === ""}
              name="wings-choice"
              value={wings}
              onChange={(event) => {
                setWings(event.target.value);
              }}
            >
              <FormControlLabel
                value="w"
                disabled={flavor === "o"}
                control={<Radio />}
                label="Willing to take a risk"
              />
              <FormControlLabel
                value="i"
                disabled={flavor === "o"}
                control={<Radio />}
                label="Integrity in action"
              />
              <FormControlLabel
                value="n"
                disabled={flavor === "o"}
                control={<Radio />}
                label="Nobility in thought"
              />
              <FormControlLabel
                value="g"
                disabled={flavor === "o"}
                control={<Radio />}
                label="Generous in spirit"
              />
              <FormControlLabel
                value="s"
                disabled={flavor === "o"}
                control={<Radio />}
                label="Self-directed"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            Who issued you the ticket?
          </Typography>
          <Autocomplete
            id="teacher-select"
            value={teacher}
            forcePopupIcon={false}
            onChange={(event, newValue) => {
              setTeacher(newValue.label);
            }}
            disabled={flavor === "o"}
            options={staff}
            sx={{ width: "60%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={submitted && teacher === "" && flavor !== "o"}
                label="Teacher Name"
              />
            )}
          />
        </Box>

        <Box sx={rowStyle}>
          <Typography variant="body1" sx={promptStyle}>
            What is your IUSD student ID?
          </Typography>
          <TextField
            error={(submitted && props.sid === "") || isNaN(props.sid)}
            required
            type={props.wallet === -1 ? "number" : "password"}
            disabled={props.wallet !== -1} // -1 if not logged in
            label="IUSD student ID"
            value={props.sid}
            helperText={
              props.sid !== "" && isNaN(props.sid)
                ? "Invalid ID: Your 9 digit student ID should not contain any letters. It should look like '123456789'."
                : ""
            }
            onChange={(e) => props.setSid(e.target.value)}
            sx={{ width: "60%" }}
          />
        </Box>

        <Button
          onClick={submit}
          fullWidth={true}
          sx={rowStyle}
          variant="contained"
        >
          submit
        </Button>
      </Box>
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
  p: 4,
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
};

const staff = [
  { label: "ALLEN" },
  { label: "ALVAREZ" },
  { label: "ANGEL" },
  { label: "ARROYO" },
  { label: "BABE" },
  { label: "BARCENAS" },
  { label: "BIRCHLER" },
  { label: "BONHALL" },
  { label: "BOSSHART" },
  { label: "BROWN" },
  { label: "BYRNE" },
  { label: "CANTU" },
  { label: "CETINELIAN" },
  { label: "CHITTAPHONG" },
  { label: "CLAPPER" },
  { label: "COLLINS" },
  { label: "CURIEL" },
  { label: "DIAZ" },
  { label: "DIFRANCESCO" },
  { label: "EISMAN" },
  { label: "FORD" },
  { label: "GARCIA" },
  { label: "GARCIAK" },
  { label: "GEORGINO" },
  { label: "GRAHAM" },
  { label: "GU" },
  { label: "HALL" },
  { label: "HARRISON" },
  { label: "HEINZ" },
  { label: "HOLNESS" },
  { label: "HONG" },
  { label: "HOUGH" },
  { label: "IGNACIO" },
  { label: "JONG" },
  { label: "KAHELIN" },
  { label: "KOZUKI" },
  { label: "KUBO" },
  { label: "LAKY" },
  { label: "LEAVEY" },
  { label: "LELLIOTT" },
  { label: "LEVENSAILOR" },
  { label: "MASCIEL" },
  { label: "MELGOZA" },
  { label: "MONTGOMERY" },
  { label: "MUNOZ" },
  { label: "NGUYEN" },
  { label: "OHASHI" },
  { label: "PATRICK" },
  { label: "PIPP" },
  { label: "RAMBO" },
  { label: "RANGEL" },
  { label: "SEILHAN" },
  { label: "SHIMAMOTO" },
  { label: "SOLIDAY" },
  { label: "TRAN" },
  { label: "TRAPP" },
  { label: "VREELAND" },
  { label: "WARE" },
];

export default Ticketing;
