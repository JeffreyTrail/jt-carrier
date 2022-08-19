import {
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import * as React from "react";
import {
  BarChart,
  LiveHelp,
  Input,
  DarkMode,
  LightMode,
  Assignment,
} from "@mui/icons-material";
import Ticketing from "./Ticketing";
import Stats from "./Stats";
import Help from "./Help";
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

function App() {

  let localDarkSetting = null;
  let localTab = null;

  if (typeof(Storage) !== "undefined") {
    // Getting user settings
    localDarkSetting = localStorage.getItem("dark")
    localTab = localStorage.getItem("tab")
  }

  const browserDarkSetting = useMediaQuery('(prefers-color-scheme: dark)');

  const [tab, setTab] = React.useState((localTab !== null) ? parseInt(localTab) : 0);
  const [dark, setDark] = React.useState((localDarkSetting !== null) ? localDarkSetting==="true" : browserDarkSetting);

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
        <AppBar position="sticky" >
        <Toolbar variant="dense">
          <img src={dark ? carrierDark : carrierLight} alt="jt-carrier-logo"/>

          <Typography variant="h5" component="div" sx={{
            flexGrow: 1,
            marginLeft: 2,
            fontFamily: "Koulen"
          }}>
            {mobile ? "" : "JT Carrier"}
          </Typography>

          {mobile ?
            <React.Fragment />
            :
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
                icon={<LiveHelp />}
                iconPosition="start"
                label="Help"
              />
            </Tabs>
          }

          <Button
            href="https://forms.gle/t9R29o6ZJXDM7NE37"
            target="_blank"
            rel="noreferrer"
            variant="variant"
            color="secondary"
            startIcon={<Assignment />}>
            {mobile ? "":"feedback"}
          </Button>

          <IconButton color="inherit" onClick={handleDark}>
            {dark ? <LightMode /> : <DarkMode />}
          </IconButton>
          </Toolbar>
        </AppBar>

        {/********************* Body *********************/}
        <Box sx={{
          width: mobile ? "90%" : "50%",
          margin: "auto",
          marginBottom: mobile ? "80px" : "auto"
        }}>
          {tab === 0 ? <Ticketing /> : (tab === 1 ? <Stats /> : <Help />)}
        </Box>

        {/************** Bottom Nav for Mobile **************/}
        {mobile ?
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={tab}
              onChange={handleTabChange}
            >
              <BottomNavigationAction label="Submit" icon={<Input />} />
              <BottomNavigationAction label="Stats" icon={<BarChart />} />
              <BottomNavigationAction label="Help" icon={<LiveHelp />} />
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
