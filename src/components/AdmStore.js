import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  FormControlLabel,
  FormControl,
  Switch,
  FormLabel,
  FormGroup,
  Checkbox,
  Modal,
  TextField,
  IconButton,
  RadioGroup,
  Radio,
} from "@mui/material";
import * as React from "react";
import {
  ExpandLess,
  ExpandMore,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

function Store({ wallet }) {
  // expand stores the pid of the item option that is currently expanded
  const [expand, setExpand] = React.useState(-1);
  const [options, setOptions] = React.useState([]);
  const [catalogue, setCatalogue] = React.useState([]);
  const [status, setStatus] = React.useState("off");

  const [mode, setMode] = React.useState("Closed");

  const [index, setIndex] = React.useState("");
  const [current, setCurrent] = React.useState({});

  React.useEffect(() => {
    fetch("https://jt-carrier-default-rtdb.firebaseio.com/catalogue.json")
      .then((response) => response.json())
      .then((data) => {
        setCatalogue(data);
      });
    fetch("https://jt-carrier-default-rtdb.firebaseio.com/status.json")
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.store);
      });
  }, []);

  const toggleStatus = () => {
    setStatus(status === "on" ? "off" : "on");
    // send to server
    fetch("https://wings-carrier.herokuapp.com/togglestore", {
      // fetch("http://127.0.0.1:5000/togglestore", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store: status === "on" ? "off" : "on",
        pass: wallet,
      }),
    });
  };

  const edit = (index) => {
    // open editor modal
    setIndex(index);
    setCurrent({
      name: catalogue[index].name,
      desc: catalogue[index].desc,
      pic: catalogue[index].pic,
      pid: catalogue[index].pid,
      price: catalogue[index].price,
      sold: catalogue[index].sold,
      options: catalogue[index].options,
      link: catalogue[index].link,
    });
    setMode("Edit");
  };

  const sendData = (nextCata) => {
    // updates backend with new ads list
    // used when editing, adding, moving
    fetch("https://wings-carrier.herokuapp.com/editstore", {
      // fetch("http://127.0.0.1:5000/editevents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store: nextCata,
        pass: wallet,
      }),
    });
  };

  const remove = () => {
    const nextCata = [...catalogue];
    nextCata.splice(index, 1);
    for (let i = index; i < nextCata.length; i++) {
      nextCata[i].pid = i; // Renumber all the catalogue entries
    }
    setCatalogue(nextCata);
    setMode("Closed");
    sendData(nextCata);
  };

  const move = (ind, dir) => {
    // Swap items to re-order events
    const nextCata = [...catalogue];
    const low = Math.max(0, Math.min(ind, ind + dir)); // Cannot be less than 0
    const high = Math.min(catalogue.length - 1, Math.max(ind, ind + dir)); // High cap

    [nextCata[low], nextCata[high]] = [nextCata[high], nextCata[low]];
    nextCata[low].pid = low; // Also update their pid
    nextCata[high].pid = high;
    setCatalogue(nextCata);
    sendData(nextCata);
  };

  const add = () => {
    // open editor with defaults
    setIndex(catalogue.length);
    setCurrent({
      name: "",
      desc: "",
      pic: "",
      pid: catalogue.length,
      price: "",
      sold: "normal",
      options: [],
      link: "",
    });
    setMode("Add");
  };

  const submit = () => {
    let copy = current;
    if (copy.pic.includes("drive.google.com/file/d")) {
      copy.pic =
        "https://drive.google.com/thumbnail?id=" +
        copy.pic.substring(
          copy.pic.indexOf("file/d") + 7,
          copy.pic.indexOf("/view?")
        );
    }

    let nextCata = [];
    if (mode === "Add") {
      nextCata = [...catalogue, copy];
    } else {
      nextCata = [
        ...catalogue.slice(0, index),
        copy,
        ...catalogue.slice(index + 1),
      ];
    }

    setCatalogue(nextCata);
    setMode("Closed");
    // send to backend
    sendData(nextCata);
  };

  // calculate the date for next Thurs
  let d = new Date();
  d.setDate(d.getDate() + (4 + 7 - (d.getDay() || 7)));
  let deliv = d.toString();
  // Get rid of unnecessary year and time info
  deliv = deliv.substring(4, deliv.indexOf("202") - 1);

  const customize = (e) => {
    // Check to see if this option has been added
    // If so, remove it; else, add it
    const index = options.indexOf(e.target.name);
    let newOptions = options;
    if (index === -1) {
      // Adding option
      newOptions.push(e.target.name);
    } else {
      // Removing option
      newOptions.splice(index, 1);
    }
    // newOptions.sort()
    setOptions(newOptions);
  };

  return (
    <Box>
      <Typography variant="h5" sx={rowStyle}>
        ADMIN MODE for WINGStore
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={status === "on"} onChange={toggleStatus} />}
          label={"The WINGStore is currently " + status + ". Toggle to Change"}
        />
      </FormGroup>

      <Button fullWidth variant="outlined" onClick={add}>
        add new listing
      </Button>

      <Modal open={mode !== "Closed"} onClose={() => setMode("Closed")}>
        <Box
          sx={{
            padding: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          <Typography id="editing-box" variant="h6" component="h2">
            {mode} Listing
          </Typography>
          <Typography paragraph>
            A listing needs a few items:
            <ol>
              <li>Name</li>
              <li>(Short) Description</li>
              <li>Picture</li>
              <li>Price</li>
              <li>Sold flag to indicate: normal, sold out, or hidden</li>
              <li>*Optional: options to modify the order (e.g. diet)</li>
              <li>*Optional: a link to more information</li>
            </ol>
            I have gotten rid of the tags.
            <br />
            If the image is hosted on Google Drive, Make sure that it is shared
            with anyone on the Internet, and copy and paste the share link.
          </Typography>
          <Box component="form" autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="name"
              label="Name of Listing"
              value={current.name}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  name: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="desc"
              label="Description"
              value={current.desc}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  desc: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="pic"
              label="URL to a picture"
              value={current.pic}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  pic: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="price"
              label="price"
              value={current.price}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  price: event.target.value,
                });
              }}
            />

            <FormControl size="small">
              <FormLabel id="sold">Item Status is Sold...</FormLabel>
              <RadioGroup
                row
                name="sold"
                value={current.sold}
                onChange={(event) =>
                  setCurrent({
                    ...current,
                    sold: event.target.value,
                  })
                }
              >
                <FormControlLabel value="out" control={<Radio />} label="out" />
                <FormControlLabel
                  value="hidden"
                  control={<Radio />}
                  label="hidden"
                />
                <FormControlLabel
                  value="normal"
                  control={<Radio />}
                  label="normal"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              size="small"
              id="options"
              label="*OPTIONAL: extra options to modify the purchase, please type these, separated by a comma (no spaces) if multiple available"
              value={current.options ? current.options.toString() : ""}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  options: event.target.value.split(","),
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="link"
              label="*OPTIONAL: url link to additional information"
              value={current.link}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  link: event.target.value,
                });
              }}
            />

            <Button
              onClick={submit}
              variant="contained"
              sx={{ marginRight: 2 }}
            >
              Update
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={remove}
              sx={{ right: 0 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Grid
        container
        spacing={1}
        alignItems="stretch"
        sx={{ marginBottom: 3, marginTop: 1 }}
      >
        {catalogue
          // .filter((item) => item.sold !== "hidden")
          .map((item, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Card raised>
                  <CardActions disableSpacing>
                    <Button
                      fullWidth
                      color="error"
                      variant="contained"
                      onClick={() => edit(index)}
                    >
                      Edit
                    </Button>
                    <IconButton onClick={() => move(index, -1)}>
                      <ArrowUpward />
                    </IconButton>
                    <IconButton onClick={() => move(index, 1)}>
                      <ArrowDownward />
                    </IconButton>
                  </CardActions>
                  <CardHeader
                    action={
                      <Typography
                        variant="h3"
                        sx={{ marginRight: 1 }}
                        color={item.price > wallet ? "error" : "default"}
                      >
                        {item.price}
                      </Typography>
                    }
                    title={item.name}
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.pic}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {item.link ? (
                      <Button
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        sx={{ marginRight: 1 }}
                      >
                        More Info
                      </Button>
                    ) : (
                      <React.Fragment />
                    )}
                    <Button
                      aria-label="order"
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setExpand(expand === item.pid ? -1 : item.pid);
                        setOptions([]);
                      }}
                      endIcon={
                        expand === item.pid ? <ExpandLess /> : <ExpandMore />
                      }
                    >
                      {item.sold === "out" || item.sold === "hidden"
                        ? item.sold
                        : "order"}
                    </Button>
                  </CardActions>
                  <Collapse
                    in={expand === item.pid}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography paragraph>
                        ASB will deliver your order by next Thursday {deliv}
                      </Typography>

                      {item.options ? (
                        <FormGroup>
                          <FormLabel id="custome-options">
                            Additional options:
                          </FormLabel>
                          {item.options.map((o, i) => {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox onChange={customize} name={o} />
                                }
                                key={i}
                                label={o}
                              />
                            );
                          })}
                        </FormGroup>
                      ) : (
                        <React.Fragment />
                      )}

                      <Button fullWidth variant="contained">
                        buy
                      </Button>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Store;
