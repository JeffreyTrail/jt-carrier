import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import {
  OpenInNew,
} from "@mui/icons-material";
import * as React from "react";

const ads = [
  {
    img: 'https://mycollegesavvy.com/wp-content/uploads/2022/04/Anything-But-A-Backpack-Day-Takes-High-Schools-By-Storm-768x511.jpeg',
    title: "Dress Up Week!",
    info: "For Nov. 14-18",
    url: "https://drive.google.com/file/d/1S1WVofEidtr1QiophEws1iEcZWxjqxjN/view",
  },
  {
    img: 'https://jeffreytrail.iusd.org/sites/jeffreytrail/files/images/jt-solo.png',
    title: "Lunchtime Clubs Schedule",
    info: "Check Out What's Happening at Lunch!",
    url: "https://drive.google.com/file/d/12ZXW2mYbTkY_fynNOxWA87tICx3ky4c3/view?usp=sharing",
  },
  {
    img: 'https://media.istockphoto.com/photos/white-wall-clock-on-blue-background-picture-id1289661784?b=1&k=20&m=1289661784&s=170667a&w=0&h=pNZcN6beC8ov_ZZGwFiFxqdFLR8GQUomjBpnz8vI_8k=',
    title: "Bell Schedule",
    info: "Click here >>>",
    url: "https://jeffreytrail.iusd.org/about/calendar-events/bell-schedule",
  },
  {
    img: 'https://drive.google.com/uc?id=16a3BXjQDtgg8uv2YjOka8kE6UDLrKrk0',
    title: "Rubik's Cube Club",
    info: "We turn colorful cubes quickly",
    url: "http://bit.ly/JTMSCubingClub",
  },
  {
    img: 'https://drive.google.com/uc?id=1UResVzqzEWMyKx6Xysc3hIRJ0hQ7E1iV',
    title: 'WE Team',
    info: "WE Team is dedicated to helping people in need of support.",
    url: "http://bit.ly/weteamweb",
  },
  {
    img: 'https://drive.google.com/uc?id=1oidr77YxqDIOMo7rLpsG1P09ZyrdANJe',
    title: 'Roblox Club',
    info: "Play games and have fun!",
    url: "https://sites.google.com/iusd.org/roblox-club-jeffrey-trail/important-info",
  },
  {
    img: 'https://drive.google.com/uc?id=10ycklaHqwBL2-FNAx77HK26bTU-QsbdQ',
    title: 'music club',
    info: "music club~ bring an instrument or sing to perform songs...",
    url: "https://sites.google.com/iusd.org/music-club-aesthetic-heh/home",
  },
  {
    img: 'https://drive.google.com/uc?id=17DjFcsuJxhg02gRkbCZJ06ba0CtwR59C',
    title: 'Arts and Crafts Club',
    info: "People join our club so they can embrace their inner artist.",
    url: "https://iusd.instructure.com/courses/119377",
  },
  {
    img: 'https://drive.google.com/uc?id=1L6sCASGvOMQBkQwN2_hKQ7-2IQbfdswf',
    title: 'Languages for Learners',
    info: "Learn languages in C-7, every single Monday during Lunch!",
    url: "https://sites.google.com/iusd.org/languages-for-learners-101/home",
  },
  {
    img: 'https://drive.google.com/uc?id=1KFID9qLaPQ6_t_JpSrIIS7assJoePSu-',
    title: 'Girls Volleyball Club',
    info: "This club allows girls to have fun while playing volleyball.",
    url: "",
  },
  {
    img: 'https://drive.google.com/uc?id=1yhpkssYO0Pub7eVTBGM4Kg9S-Kdg4PvG',
    title: 'The Storymakers - Writing Club',
    info: "Interested in writing? Join the Storymakers club!",
    url: "https://hpchang720.wixsite.com/storymakersjtms",
  },
  {
    img: 'https://jeffreytrail.iusd.org/sites/jeffreytrail/files/images/pages/squareimages/ennarah_friends_009.jpg',
    title: 'ASB Ideas Form',
    info: "Submit your event idea to ASB!",
    url: "https://bit.ly/ASBIdeasForm",
  },
  {
    img: 'https://drive.google.com/uc?id=1rxxkK8AebqKd0kyK-Vw3ejckgQHKg4rt',
    title: 'Clash Royale Club',
    info: "Join the clash royale club, participate in tournaments!",
    url: "",
  },
  {
    img: 'https://drive.google.com/uc?id=14vIn0blNYbOY-M5yiYmAZ2YcGpczEFk8',
    title: 'Editing Club',
    info: "Editing club is where you can learn to edit and have fun.",
    url: "",
  },
  {
    img: 'https://drive.google.com/uc?id=1yie4KuXTUKYzbtUD9dztlEMvsLXpliAi',
    title: 'Jet Gazette, Student News.',
    info: "JTTV But in paper (Maybe even better!)",
    url: "https://bit.ly/JetGazette",
  },
  {
    img: 'https://drive.google.com/uc?id=1hjNLloj5Xl56B08N456vXNBeAj9MdqQz',
    title: "Knitting, Crochet & Sewing",
    info: "Join our yarn & craft club every week Wednesday at lunch!",
    url: "https://sites.google.com/u/0/d/1pPhb8gSBiSiDA6_vmcqK_1YJnnFGGNq0/preview",
  },
];

function Events() {
  return (
    <Box sx={{
      display: "flex",
      height: "100%",
      flexDirection: "column"
    }}>
      <Box sx={rowStyle}>
        <Typography variant="h5">What's Happening at JTMS?</Typography>
      </Box>

      <br />

      <Typography variant="h6">
        Advertise your club or event right here on JT Carrier! <a href="https://forms.gle/mWXPPqiaDCzEvRuu6" target="_blank" rel="noreferrer">Interest Form</a>
        <br />
        Reach ~600 students each week. All you need is an image and a tag line!
      </Typography>

      <ImageList variant="quilted" cols={3} gap={9}>
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
              actionIcon={item.url === "" ? "" :
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <OpenInNew />
                </IconButton>
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
