import {
  Box,
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
  Stack,
  Alert,
  Snackbar,
  Slide,
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
  CalendarMonth,
  Storefront,
  MenuOpen,
} from "@mui/icons-material";

import Ticketing from "./components/Ticketing";
import Stats from "./components/Stats";
import Help from "./components/Help";
import Adv from "./components/Adv";
import Events from "./components/Events";
import Store from "./components/Store";
import Dash from "./components/Dash";

import ReactGA from "react-ga4";

import carrierDark from "./carrier-darkm.png";
import carrierLight from "./carrier-lightm.png";

import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: "#d69f12",
    },
    secondary: {
      main: "#1452ee",
    },
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});
const lightTheme = createTheme({
  palette: {
    htmlFontSize: 15,
    mode: "light",
    primary: {
      main: "#eeb114",
    },
    secondary: {
      main: "#1452ee",
    },
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});

const CURRENT = "01.02.23";

function App() {
  // Global snackbar for delivering status info
  const [notif, setNotif] = React.useState(["info", ""]);

  let localDarkSetting = null;
  let localTab = null;
  let localNews = null;
  let localSid = null;
  let localDashon = null;

  if (typeof Storage !== "undefined") {
    // Getting user settings
    localDarkSetting = localStorage.getItem("dark");
    localTab = localStorage.getItem("tab");
    localNews = localStorage.getItem("news");
    localSid = localStorage.getItem("sid");
    localDashon = localStorage.getItem("dashon");
  }

  const browserDarkSetting = useMediaQuery("(prefers-color-scheme: dark)");

  const [tab, setTab] = React.useState(
    localTab !== null ? parseInt(localTab) : 0
  );
  const [dark, setDark] = React.useState(
    localDarkSetting !== null ? localDarkSetting === "true" : browserDarkSetting
  );

  // Wallet for the store
  const [wallet, setWallet] = React.useState(-1);

  // Saved SID
  const [sid, setSid] = React.useState(localSid === null ? "" : localSid);

  // News & News Popover
  const [news, setNews] = React.useState(
    localNews !== null ? localNews : "08.18.22"
  );
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Dashboard hide
  const [dashon, setDashon] = React.useState(
    localDashon === null ? "on" : localDashon
  );

  const open = Boolean(anchorEl);
  const id = open ? "news-popover" : undefined;
  // ********************************************************

  ReactGA.initialize("G-EVN3SKCV1C");
  ReactGA.send("pageview");

  const [mobile, setMobile] = React.useState(
    (typeof window !== "undefined" ? window.innerWidth : 0) < 750
  );
  const updateWidth = () => {
    setMobile((typeof window !== "undefined" ? window.innerWidth : 0) < 750);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  const handleDashonChange = (e) => {
    const newDashset = dashon === "on" ? "off" : "on";
    if (typeof Storage !== "undefined")
      localStorage.setItem("dashon", newDashset);
    setDashon(newDashset);
  };

  const handleTabChange = (e, newMode) => {
    setTab(newMode);
    if (typeof Storage !== "undefined") localStorage.setItem("tab", newMode);
  };

  const handleNews = (event) => {
    setNews(CURRENT);
    if (typeof Storage !== "undefined") localStorage.setItem("news", CURRENT);
    setAnchorEl(event.currentTarget);
  };

  const handleDark = (e) => {
    const newMode = !dark;
    setDark(newMode);
    if (typeof Storage !== "undefined") localStorage.setItem("dark", newMode);
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
        }}
      >
        <AppBar
          position="sticky"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar variant="dense">
            <img
              src={dark ? carrierDark : carrierLight}
              alt="jt-carrier-logo"
            />

            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: 2,
                fontFamily: "Koulen",
              }}
            >
              {mobile ? "" : "JT Carrier"}
            </Typography>

            {mobile ? (
              <IconButton
                href="https://forms.gle/t9R29o6ZJXDM7NE37"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <FeedbackOutlined />
              </IconButton>
            ) : (
              <Tooltip title="Report Bugs & Feedback">
                <Button
                  href="https://forms.gle/t9R29o6ZJXDM7NE37"
                  target="_blank"
                  rel="noreferrer"
                  color="inherit"
                >
                  <FeedbackOutlined sx={{ marginRight: 1 }} />
                  report
                </Button>
              </Tooltip>
            )}

            <Tooltip title="News & Updates">
              <IconButton color="inherit" onClick={handleNews}>
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={news === CURRENT}
                >
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
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                sx: { width: mobile ? "75%" : "25%" },
              }}
            >
              <Paper
                sx={{
                  padding: 3,
                }}
              >
                <Typography variant="h6">🎉What's New?! {CURRENT}</Typography>
                <hr />
                <Typography variant="body1">
                  The WINGStore is now live! Also added the accounts dashboard.
                </Typography>
                <br />
                <Typography variant="body1">
                  Ticket submissions heatmap & orange tickets leaderboard in the
                  Stats tab.
                </Typography>
                <br />
                <Typography variant="body1">
                  The Events tab! Check out the latest events at JTMS, and
                  advertise yours!
                </Typography>
                <br />
                <Typography variant="body1">
                  History tab is in beta! You can now see a history of all the
                  tickets you've submitted this year and when.
                </Typography>
                <br />
                <Typography variant="body1">
                  Check out the Advantage Itinerary! Nav menu has been moved to
                  accommodate the additional tab.
                </Typography>
                <br />
                <Typography variant="body1">
                  This textbox! It describes updates & features recently added
                  to JT Carrier
                </Typography>
                <br />
                <Typography variant="body1">
                  Under the Stats tab, find a running total of all WINGS tickets
                  submitted this year
                </Typography>
              </Paper>
            </Popover>

            <Tooltip
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <IconButton color="inherit" onClick={handleDark}>
                {dark ? <DarkModeOutlined /> : <LightModeOutlined />}
              </IconButton>
            </Tooltip>

            <Tooltip
              title={dashon === "on" ? "Hide Dashboard" : "Show Dashboard"}
            >
              <IconButton color="inherit" onClick={handleDashonChange}>
                {dashon === "on" ? (
                  <MenuOpen sx={{ transform: "rotate(180deg)" }} />
                ) : (
                  <MenuOpen />
                )}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {mobile ? (
          <React.Fragment />
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 145,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItemButton
                  selected={tab === 0}
                  onClick={() => handleTabChange("", 0)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Input sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Submit" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 1}
                  onClick={() => handleTabChange("", 1)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <BarChart sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Statistics" />
                </ListItemButton>

                <Divider />

                <ListItemButton
                  selected={tab === 2}
                  onClick={() => handleTabChange("", 2)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <InfoOutlined sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Help" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 3}
                  onClick={() => handleTabChange("", 3)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <InterestsOutlined sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Advantage" />
                </ListItemButton>

                <ListItemButton
                  selected={tab === 5}
                  onClick={() => handleTabChange("", 5)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CalendarMonth sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItemButton>

                <Divider />

                <ListItemButton
                  selected={tab === 6}
                  onClick={() => handleTabChange("", 6)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Storefront sx={{ fontSize: "1.2rem" }} />
                  </ListItemIcon>
                  <ListItemText primary="Store" />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
        )}

        {/********************* Body *********************/}
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              width: mobile ? "90%" : "70%",
              marginLeft: mobile ? "auto" : "155px",
              paddingRight: mobile ? "auto" : "5px",
              marginBottom: mobile ? "10px" : "auto",
            }}
          >
            {tab === 0 ? (
              <Ticketing
                setNotif={setNotif}
                sid={sid}
                setSid={setSid}
                wallet={wallet}
                setWallet={setWallet}
              />
            ) : tab === 1 ? (
              <Stats />
            ) : tab === 2 ? (
              <Help />
            ) : tab === 3 ? (
              <Adv />
            ) : tab === 5 ? (
              <Events />
            ) : (
              <Store
                wallet={wallet}
                setWallet={setWallet}
                sid={sid}
                setNotif={setNotif}
              />
            )}
          </Box>

          {mobile ? (
            <React.Fragment />
          ) : (
            <Box sx={{ width: "17%" }}>
              <Slide
                sx={{
                  position: "sticky",
                  top: "72px",
                  marginRight: 1,
                  marginBottom: 3,
                }}
                direction="left"
                in={dashon === "on"}
              >
                <Box
                  sx={{
                    overflowX: "hidden",
                  }}
                >
                  <Dash
                    sid={sid}
                    setSid={setSid}
                    wallet={wallet}
                    setWallet={setWallet}
                    setNotif={setNotif}
                  />
                </Box>
              </Slide>
            </Box>
          )}
        </Stack>

        <Snackbar
          open={notif[1] !== ""}
          autoHideDuration={15000}
          onClose={() => setNotif([notif[0], ""])}
          resumeHideDuration={30000}
        >
          <Alert
            onClose={() => setNotif([notif[0], ""])}
            severity={notif[0]}
            sx={{ width: "100%" }}
          >
            {notif[1]}
          </Alert>
        </Snackbar>

        {/************** Bottom Nav for Mobile **************/}
        {mobile ? (
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={5}
          >
            <BottomNavigation showLabels value={tab} onChange={handleTabChange}>
              <BottomNavigationAction label="Submit" icon={<Input />} />
              <BottomNavigationAction label="Stats" icon={<BarChart />} />
              <BottomNavigationAction label="Help" icon={<InfoOutlined />} />
              <BottomNavigationAction
                label="Advantage"
                icon={<InterestsOutlined />}
              />
            </BottomNavigation>
          </Paper>
        ) : (
          <React.Fragment />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
