import {
  Box,
  // Tabs,
  // Tab,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Popover,
  Tooltip,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Drawer,
} from "@mui/material";
import * as React from "react";
import {
  BarChart,
  InfoOutlined,
  Input,
  DarkModeOutlined,
  LightModeOutlined,
  FeedbackOutlined,
  NotificationsOutlined,
  InterestsOutlined,
  History,
  CalendarMonth,
} from "@mui/icons-material";

import Ticketing from "./Ticketing";
import Stats from "./Stats";
import Help from "./Help";
import Adv from "./Adv";
import Hist from "./Hist";
import Events from "./Events";

import ReactGA from "react-ga4";


import carrierDark from "./carrier-darkm.png"
import carrierLight from "./carrier-lightm.png"

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme =  createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#d69f12',
    },
    secondary: {
      main: '#1452ee',
    }
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  },
});
const lightTheme = createTheme({
  palette: {
    htmlFontSize: 15,
    mode: 'light',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#eeb114',
    },
    secondary: {
      main: '#1452ee',
    }
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  },
});

const CURRENT = "10.10.22"

function App() {

  let localDarkSetting = null;
  let localTab = null;
  let localNews = null;

  if (typeof(Storage) !== "undefined") {
    // Getting user settings
    localDarkSetting = localStorage.getItem("dark")
    localTab = localStorage.getItem("tab")
    localNews = localStorage.getItem("news")
  }

  const browserDarkSetting = useMediaQuery('(prefers-color-scheme: dark)');

  const [tab, setTab] = React.useState((localTab !== null) ? parseInt(localTab) : 0);
  const [dark, setDark] = React.useState((localDarkSetting !== null) ? localDarkSetting==="true" : browserDarkSetting);

  // News & News Popover
  const [news, setNews] = React.useState((localNews !== null) ? localNews : "08.18.22");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'news-popover' : undefined;
  // ********************************************************

  ReactGA.initialize("G-EVN3SKCV1C");
  ReactGA.send("pageview");

  const [mobile, setMobile] = React.useState((typeof window !== "undefined" ? window.innerWidth : 0) < 750 );
  const updateWidth = () => {
    setMobile((typeof window !== "undefined" ? window.innerWidth : 0) < 750);
  }

  React.useEffect(()=>{
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  const handleTabChange = (e,newMode) => {
    setTab(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("tab", newMode);
  }

  const handleNews = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNews(CURRENT);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("news", CURRENT);
    setAnchorEl(event.currentTarget);
  };

  const handleDark = (e) => {
    const newMode = !dark;
    setDark(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("dark", newMode);
  }

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
          }}
        >
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          <img src={dark ? carrierDark : carrierLight} alt="jt-carrier-logo"/>

          <Typography variant="h5" component="div" sx={{
            flexGrow: 1,
            marginLeft: 2,
            fontFamily: "Koulen"
          }}>
            {mobile ? "" : "JT Carrier"}
          </Typography>

          <Typography variant="body1" color={dark ? "primary" : "secondary"} sx={{
            flexGrow: 1,
            marginLeft: 2,
          }}>
            <strong>
            Want to help me run JT Carrier? Come to Mr. Gu's Advantage in G4 on Wed, 10/12!
            </strong>
          </Typography>

          {mobile ?
            <IconButton
              href="https://forms.gle/t9R29o6ZJXDM7NE37"
              target="_blank"
              rel="noreferrer"
              color="inherit"
            >
              <FeedbackOutlined />
            </IconButton>
            :
            <Tooltip title="Report Bugs & Feedback">
              <Button
                href="https://forms.gle/t9R29o6ZJXDM7NE37"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <FeedbackOutlined sx={{marginRight: 1}}/>
                report
              </Button>
            </Tooltip>
          }

          <Tooltip title="News & Updates">
            <IconButton color="inherit" onClick={handleNews}>
              <Badge color="secondary" variant="dot" invisible={news === CURRENT}>
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: { width: mobile ? "75%" : "25%" },
            }}
          >
            <Paper sx={{
              padding: 3,
            }}>
              <Typography variant="h6">🎉What's New?! {CURRENT}</Typography>
              <hr />
              <Typography variant="body1">
                The Events tab! Check out the latest events at JTMS, and advertise yours!
              </Typography>
              <br />
              <Typography variant="body1">
                History tab is in beta! You can now see a history of all the tickets
                you've submitted this year and when.
              </Typography>
              <br />
              <Typography variant="body1">
                Check out the Advantage Itinerary! Nav menu has been moved
                to accommodate the additional tab.
              </Typography>
              <br />
              <Typography variant="body1">
                This textbox! It describes updates &
                features recently added to JT Carrier
              </Typography>
              <br />
              <Typography variant="body1">
                Under the Stats tab, find a running total
                of all WINGS tickets submitted this year
              </Typography>
            </Paper>
          </Popover>

          <Tooltip title={dark ? "Switch to Light Mode": "Switch to Dark Mode"}>
            <IconButton color="inherit" onClick={handleDark}>
              {dark ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
          </Tooltip>

          </Toolbar>
        </AppBar>

        {mobile ?
          <React.Fragment />
          :
          <Drawer
            variant="permanent"
            sx={{
              width: 200,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 180, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItemButton
                  selected={tab === 0}
                  onClick={()=>handleTabChange("", 0)}
                >
                  <ListItemIcon>
                    <Input />
                  </ListItemIcon>
                  <ListItemText primary="Submit" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 1}
                  onClick={()=>handleTabChange("", 1)}
                >
                  <ListItemIcon>
                    <BarChart />
                  </ListItemIcon>
                  <ListItemText primary="Statistics" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 2}
                  onClick={()=>handleTabChange("", 2)}
                >
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </ListItemButton>

                <Divider />

                <ListItemButton
                  selected={tab === 3}
                  onClick={()=>handleTabChange("", 3)}
                >
                  <ListItemIcon>
                    <InfoOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Help" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 4}
                  onClick={()=>handleTabChange("", 4)}
                >
                  <ListItemIcon>
                    <InterestsOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Advantage" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 5}
                  onClick={()=>handleTabChange("", 5)}
                >
                  <ListItemIcon>
                    <Badge color="secondary" variant="dot">
                      <CalendarMonth />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItemButton>

              </List>
            </Box>
          </Drawer>
          }

          {/*<Toolbar variant="dense" sx={{width: "100%"}}>
            <Paper elevation={3} sx={{width: "100%"}}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{flexGrow: 1}}
              >
                <Tab
                  icon={<Input />}
                  iconPosition="start"
                  label="Submit"
                />
                <Tab
                  icon={<BarChart />}
                  iconPosition="start"
                  label="Stats"
                />
                <Tab
                  icon={<InfoOutlined />}
                  iconPosition="start"
                  label="Help"
                />
                <Tab
                  icon={<InterestsOutlined />}
                  iconPosition="start"
                  label="Advantage"
                />
              </Tabs>
            </Paper>
          </Toolbar>*/}

        {/********************* Body *********************/}
        <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}} >
          <Box sx={{
            width: mobile ? "90%" : "60%",
            marginLeft: "220px",
            marginBottom: mobile ? "80px" : "auto"
          }}>
            {tab === 0 ?
              <Ticketing />
              :
              (tab === 1 ?
                <Stats />
                :
                (tab === 2 ?
                  <Hist />
                  :
                  (tab === 3 ?
                    <Help />
                    :
                    (tab === 4 ?
                      <Adv />
                      :
                      <Events />
                    )
                  )
                )
              )
            }
          </Box>
          {/*mobile
            ?
            <React.Fragment />
            :
            <Box sx={{
              width: "20%",
              marginLeft: 5,
              marginTop: 10,

              // marginBottom: mobile ? "80px" : "auto"
            }}>
              <a href="https://bit.ly/ASBIdeasForm" target="_blank" rel="noreferrer">
                <img src="https://drive.google.com/uc?id=1OlqUgzCSRaf_fovGxA8X35XdcaKpxddX" alt="ASB Events Interest"/>
              </a>
            </Box>
          */}
        </Box>

        {/************** Bottom Nav for Mobile **************/}
        {mobile ?
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={50}>
            <BottomNavigation
              showLabels
              value={tab}
              onChange={handleTabChange}
            >
              <BottomNavigationAction label="Submit" icon={<Input />} />
              <BottomNavigationAction label="Stats" icon={<BarChart />} />
              <BottomNavigationAction label="History" icon={<History />} />
              <BottomNavigationAction label="Help" icon={<InfoOutlined />} />
              {/*<BottomNavigationAction label="Advantage" icon={<InterestsOutlined />} />*/}
            </BottomNavigation>
          </Paper>
          :
          <React.Fragment />
        }
        </Box>
    </ThemeProvider>
  );
}

export default App;
