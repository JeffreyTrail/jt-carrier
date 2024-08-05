import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import {
  OpenInNew,
  Edit,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import * as React from "react";

function AdmEvents() {
  const [ads, setAds] = React.useState([]);
  const [mode, setMode] = React.useState("Closed");

  const [index, setIndex] = React.useState("");
  const [current, setCurrent] = React.useState({});

  const update = () => {
    // fetch real time data from db
    // is function to be able to refresh easily
    fetch("https://jt-carrier-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      });
  };

  React.useEffect(update, []);

  const move = (ind, dir) => {
    // Swap items to re-order events
    const nextAds = [...ads];
    const low = Math.max(0, Math.min(ind, ind + dir)); // Cannot be less than 0
    const high = Math.min(ads.length - 1, Math.max(ind, ind + dir)); // High cap

    [nextAds[low], nextAds[high]] = [nextAds[high], nextAds[low]];
    setAds(nextAds);
  };

  const edit = (index) => {
    // open editor modal
    setIndex(index);
    setCurrent({
      title: ads[index].title,
      img: ads[index].img,
      info: ads[index].info,
      url: ads[index].url,
    });
    setMode("Edit");
  };

  const add = () => {
    // open editor with defaults
    setIndex(ads.length);
    setCurrent({
      title: "",
      img: "",
      info: "",
      url: "",
    });
    setMode("Add");
  };

  const submit = () => {
    if (mode === "Add") {
      setAds([current, ...ads]);
    } else {
      setAds([...ads.splice(0, index), current, ...ads.splice(index + 1)]);
    }
    setMode("Closed");
    // send to backend
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={rowStyle}>
        <Typography variant="h5">Admin Mode for Events Tab</Typography>
      </Box>

      <Button fullWidth variant="outlined" onClick={add}>
        add new event
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
            {mode} Event
          </Typography>
          <Typography paragraph>
            An event needs four items: 1) Name 2) A short tagline 3) Image URL
            4) A (optional) URL to their website for more info. Make sure to vet
            what they are linking to. If they don't provide a URL, please enter
            "none", verbatim no quotes. If the image is hosted on Google Drive,
            Make sure that it is shared with anyone on the Internet, and copy
            and paste the share link.
          </Typography>
          <Box component="form" autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="title"
              label="Name of Club/Event"
              value={current.title}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  title: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="info"
              label="Information Tagline"
              value={current.info}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  info: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="img"
              label="url for Image Link"
              value={current.img}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  img: event.target.value,
                });
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              size="small"
              required
              id="url"
              label="url to their Website for More Info"
              value={current.url}
              onChange={(event) => {
                setCurrent({
                  ...current,
                  url: event.target.value,
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
              onClick={() => {
                setAds([...ads.splice(0, index), ...ads.splice(index + 1)]);
                setMode("Closed");
              }}
              sx={{ right: 0 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <ImageList variant="masonry" cols={3} gap={9}>
        {ads.map((item, index) => (
          <ImageListItem key={item.img}>
            <ImageListItemBar
              position="top"
              actionIcon={
                <Box>
                  <IconButton onClick={() => edit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => move(index, -1)}>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton onClick={() => move(index, 1)}>
                    <ArrowDownward />
                  </IconButton>
                </Box>
              }
              actionPosition="left"
            />
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.info}
              actionIcon={
                item.url === "none" ? (
                  ""
                ) : (
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OpenInNew />
                  </IconButton>
                )
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
  marginBottom: 1,
};

export default AdmEvents;
