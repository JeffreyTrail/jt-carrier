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

const ads = [
  {
    img: "https://www.onoursleeves.org/-/media/onoursleeves/graphics/hands-and-heart.ashx?la=en&hash=C1C7A5CDBD2C3F441886AE4C70EE94EE",
    title: "Kindness Week Schedule",
    info: "Check out fun events and dress-up themes everyday!",
    url: "https://docs.google.com/presentation/d/1tk4Nvy2Ah6GyA-N8ZWhfVmlDivk6P-4gdjw5Gv5s-js/edit?usp=sharing",
  },
  {
    img: "https://jeffreytrail.iusd.org/sites/jeffreytrail/files/images/jt-solo.png",
    title: "Lunchtime Clubs Schedule",
    info: "Check Out What's Happening at Lunch!",
    url: "https://drive.google.com/file/d/12ZXW2mYbTkY_fynNOxWA87tICx3ky4c3/view?usp=sharing",
  },
  {
    img: "https://media.istockphoto.com/photos/white-wall-clock-on-blue-background-picture-id1289661784?b=1&k=20&m=1289661784&s=170667a&w=0&h=pNZcN6beC8ov_ZZGwFiFxqdFLR8GQUomjBpnz8vI_8k=",
    title: "Bell Schedule",
    info: "Click here >>>",
    url: "https://jeffreytrail.iusd.org/about/calendar-events/bell-schedule",
  },
  {
    img: "https://drive.google.com/uc?id=16a3BXjQDtgg8uv2YjOka8kE6UDLrKrk0",
    title: "Rubik's Cube Club",
    info: "We turn colorful cubes quickly",
    url: "http://bit.ly/JTMSCubingClub",
  },
  {
    img: "https://drive.google.com/uc?id=1UResVzqzEWMyKx6Xysc3hIRJ0hQ7E1iV",
    title: "WE Team",
    info: "WE Team is dedicated to helping people in need of support.",
    url: "http://bit.ly/weteamweb",
  },
  {
    img: "https://drive.google.com/uc?id=1oidr77YxqDIOMo7rLpsG1P09ZyrdANJe",
    title: "Roblox Club",
    info: "Play games and have fun!",
    url: "https://sites.google.com/iusd.org/roblox-club-jeffrey-trail/important-info",
  },
  {
    img: "https://drive.google.com/uc?id=10ycklaHqwBL2-FNAx77HK26bTU-QsbdQ",
    title: "music club",
    info: "music club~ bring an instrument or sing to perform songs...",
    url: "https://sites.google.com/iusd.org/music-club-aesthetic-heh/home",
  },
  {
    img: "https://drive.google.com/uc?id=17DjFcsuJxhg02gRkbCZJ06ba0CtwR59C",
    title: "Arts and Crafts Club",
    info: "People join our club so they can embrace their inner artist.",
    url: "https://iusd.instructure.com/courses/119377",
  },
  {
    img: "https://drive.google.com/uc?id=1L6sCASGvOMQBkQwN2_hKQ7-2IQbfdswf",
    title: "Languages for Learners",
    info: "Learn languages in C-7, every single Monday during Lunch!",
    url: "https://sites.google.com/iusd.org/languages-for-learners-101/home",
  },
  {
    img: "https://drive.google.com/uc?id=1KFID9qLaPQ6_t_JpSrIIS7assJoePSu-",
    title: "Girls Volleyball Club",
    info: "This club allows girls to have fun while playing volleyball.",
    url: "",
  },
  {
    img: "https://drive.google.com/uc?id=1yhpkssYO0Pub7eVTBGM4Kg9S-Kdg4PvG",
    title: "The Storymakers - Writing Club",
    info: "Interested in writing? Join the Storymakers club!",
    url: "https://hpchang720.wixsite.com/storymakersjtms",
  },
  {
    img: "https://jeffreytrail.iusd.org/sites/jeffreytrail/files/images/pages/squareimages/ennarah_friends_009.jpg",
    title: "ASB Ideas Form",
    info: "Submit your event idea to ASB!",
    url: "https://bit.ly/ASBIdeasForm",
  },
  {
    img: "https://drive.google.com/uc?id=1rxxkK8AebqKd0kyK-Vw3ejckgQHKg4rt",
    title: "Clash Royale Club",
    info: "Join the clash royale club, participate in tournaments!",
    url: "",
  },
  {
    img: "https://drive.google.com/uc?id=14vIn0blNYbOY-M5yiYmAZ2YcGpczEFk8",
    title: "Editing Club",
    info: "Editing club is where you can learn to edit and have fun.",
    url: "",
  },
  {
    img: "https://drive.google.com/uc?id=1yie4KuXTUKYzbtUD9dztlEMvsLXpliAi",
    title: "Jet Gazette, Student News.",
    info: "JTTV But in paper (Maybe even better!)",
    url: "https://bit.ly/JetGazette",
  },
  {
    img: "https://drive.google.com/uc?id=1hjNLloj5Xl56B08N456vXNBeAj9MdqQz",
    title: "Knitting, Crochet & Sewing",
    info: "Join our yarn & craft club every week Wednesday at lunch!",
    url: "https://sites.google.com/u/0/d/1pPhb8gSBiSiDA6_vmcqK_1YJnnFGGNq0/preview",
  },
  {
    img: "https://drive.google.com/uc?id=16pup8eeeuiRqtQg-L8vM62StHPp-jMG5",
    title: "Website Enhancer",
    info: "Need help with your website? Click here!",
    url: "https://bit.ly/WebsiteEnhancer",
  },
  {
    img: "https://drive.google.com/uc?id=1v9RX5nm8BhX6NOHe6r7X6O_3emS01rsr",
    title: "Dungeons and Dragons.",
    info: "Join us. We will take you on a mystical journey.",
    url: "https://bit.ly/DnD_SIte",
  },
  {
    img: "https://drive.google.com/uc?id=1iYcwWtGz7CnYdCcX5JJaM6FqYV8W5itm",
    title: "Film Club",
    info: "Having fun, making a movie together!",
    url: "https://sites.google.com/iusd.org/film-club/home?authuser=2",
  },
  {
    img: "https://drive.google.com/uc?id=16HinJGkdxGNO4WUh_QUYGj5-PsKp8k2W",
    title: "Environment Club",
    info: "Show your love for the Environment!",
    url: "",
  },
  {
    img: "https://drive.google.com/uc?id=1gFVS3Unp7Lh8xDLtvtFxHRJQk4dccFL3",
    title: "Baking Club!!",
    info: "Even if you can't bake, you can join! ( We have treats C: )",
    url: "https://bakingclub22.carrd.co/",
  },
  {
    img: "https://drive.google.com/uc?id=1FTOm4d_YE5n5yNy3v8F-AAshlxoFzjvP",
    title: "Sticker Workshop 101",
    info: "Come to C-5 every Tuesday to make DIY Stickers!",
    url: "https://sites.google.com/iusd.org/sticker-workshop-101/home",
  },
  {
    img: "https://drive.google.com/uc?id=1ZhttLslA0EXhEpf2GXDMB6qiAOefWLtv",
    title: "Skill and Tell",
    info: "Learn fun skills with your friends and win the weekly games!",
    url: "",
  },
  {
    img: "https://drive.google.com/uc?id=1Db_GYa-J8D5eBAU54gOev_tupP-L5XJl",
    title: "Minecraft Club",
    info: "Hang out and talk about minecraft and play on a SMP and etc!",
    url: "https://bit.ly/JtmsMinecraft",
  },
  {
    img: "https://drive.google.com/uc?id=1kk5GDUqnuG2LsjCtJvoJayBn67SO9nNz",
    title: "KPOP CLUB",
    info: "Our Kpop club is the club that everyone enjoy and learn kpop",
    url: "https://sites.google.com/iusd.org/k-pop-club/home",
  },
  {
    img: "https://variety.com/wp-content/uploads/2021/11/DSCF3101_2_crop-e1637611739593.jpg",
    title: "Taylor Swift",
    info: "is in D3 Mrs. Barcenas",
    url: "",
  },
];

function Events() {
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
