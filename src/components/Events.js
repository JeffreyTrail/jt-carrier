import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import * as React from "react";

function Events() {
  const [ads, setAds] = React.useState([]);

  React.useEffect(() => {
    fetch("https://jt-carrier-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        setAds(data.ads);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={rowStyle}>
        <Typography variant="h5">What's Happening at JTMS?</Typography>
      </Box>

      <br />

      <Typography paragraph>
        Advertise your club or event right here on JT Carrier!{" "}
        <a
          href="https://forms.gle/mWXPPqiaDCzEvRuu6"
          target="_blank"
          rel="noreferrer"
        >
          Interest Form
        </a>
        <br />
        Reach ~600 students each week. All you need is an image and a tag line!
      </Typography>

      <ImageList variant="masonry" cols={3} gap={9}>
        {ads.map((item) => (
          <ImageListItem key={item.img}>
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
                item.url === "" ? (
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
};

export default Events;
