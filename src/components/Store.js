import {
  Alert,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Collapse,
  Stack,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import * as React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function Store({ wallet, setWallet, sid, setNotif }) {
  // expand stores the pid of the item option that is currently expanded
  const [expand, setExpand] = React.useState(-1);
  const [deliv, setDeliv] = React.useState("ready");
  const buy = (itemn) => {
    console.log("This guy wants to buy:");
    console.log(catalogue[itemn]);
    console.log("with " + deliv + " delivery");
    setWallet(wallet - catalogue[itemn].price);
    setNotif([
      "success",
      "Your order of " +
        catalogue[itemn].name +
        " has been placed. " +
        (deliv === "ready"
          ? "We will deliver it as soon as it becomes available."
          : deliv === "thurs"
          ? "It will be delivered during 4th period on " + nextThurs + "."
          : "Come by G4 today during the first 10 minutes of lunch to pick up!"),
    ]);
    setDeliv("ready");
    setExpand(-1);
  };

  // calculate the date for next
  let d = new Date();
  d.setDate(d.getDate() + (4 + 7 - (d.getDay() || 7)));
  let nextThurs = d.toString();
  nextThurs = nextThurs.substring(4, nextThurs.indexOf("202") - 1);

  return (
    <Box>
      <Typography variant="h5" sx={rowStyle}>
        The WINGStore
      </Typography>
      <Typography paragraph>
        Redeem your tickets to have them added to your wallet. Orange tickets
        will not be included. <br />
        Running low on tickets? Ask your teachers how you can earn more!
      </Typography>

      {wallet === -1 ? (
        <Alert severity="error">
          You must sign in to use the WINGStore. Log in on your right
        </Alert>
      ) : (
        <React.Fragment />
      )}

      <Grid
        container
        spacing={1}
        alignItems="stretch"
        sx={{ marginBottom: 3, marginTop: 1 }}
      >
        {catalogue.map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card raised>
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
                  subheader={
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                      {item.tags.map((tag, i) => {
                        return (
                          <Chip
                            key={i}
                            label={tag}
                            variant="outlined"
                            color={
                              tag === "Vegan"
                                ? "success"
                                : tag === "Food" || tag === "Drink"
                                ? "warning"
                                : tag === "Merch"
                                ? "info"
                                : "error"
                            }
                            size="small"
                          />
                        );
                      })}
                    </Stack>
                  }
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
                    aria-label="buy"
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setExpand(expand === item.pid ? -1 : item.pid);
                      setDeliv("ready");
                    }}
                    disabled={item.price > wallet}
                    endIcon={
                      expand === item.pid ? <ExpandLess /> : <ExpandMore />
                    }
                  >
                    order
                  </Button>
                </CardActions>
                <Collapse in={expand === item.pid} timeout="auto" unmountOnExit>
                  <CardContent>
                    <FormControl>
                      <FormLabel id="deliv-options">
                        Choose a delivery option:
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="deliv-options"
                        value={deliv}
                        onChange={(e) => setDeliv(e.target.value)}
                        name="deliv-options"
                      >
                        <FormControlLabel
                          disabled={item.deliv[0]}
                          value="pickup"
                          control={<Radio />}
                          label="Same-day Pickup"
                        />
                        <FormControlLabel
                          disabled={item.deliv[1]}
                          value="thurs"
                          control={<Radio />}
                          label={"Next Thurs (" + nextThurs + ")"}
                        />
                        <FormControlLabel
                          disabled={item.deliv[2]}
                          value="ready"
                          control={<Radio />}
                          label="When Ready (ASAP)"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => buy(item.pid)}
                    >
                      Place Order
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

// deliv: [same-day, next-thurs, when-ready]
// false means available, true means not available
const catalogue = [
  {
    pid: 0,
    name: "Bag of Chips [Classic]",
    price: 5,
    tags: ["Food", "Vegan"],
    pic: "https://blog.counselfinancial.com/hubfs/EMAIL_Images/Association%20Endorsements/potato-chips-448737_640.jpg",
    desc: "You get a RANDOM bag of chips. Try your luck and see if you get the bag you want.",
    deliv: [true, false, false],
  },
  {
    pid: 1,
    name: "Can of Pepsi",
    price: 6,
    tags: ["Drink", "Vegan"],
    pic: "https://www.snackhistory.com/wp-content/uploads/2022/02/Pepsi-3.jpg",
    desc: "Sorry we don't have coke. Is Pepsi okay? Same-day pick up available. Sugar-free option available.",
    deliv: [false, false, false],
  },
  {
    pid: 2,
    name: "Oreos [Pack of 2]",
    price: 3,
    tags: ["Food", "Vegan"],
    pic: "https://static.onecms.io/wp-content/uploads/sites/19/2021/08/12/oreo-hero.jpg",
    desc: "Sometimes you just CRAVE an oreo. You don't need a lot; just one or two. Same-day pick up available.",
    deliv: [false, false, false],
  },
  {
    pid: 3,
    name: "Principal for a Day",
    price: 52,
    tags: ["Experience", "Vegan"],
    pic: "https://drive.google.com/uc?id=1X1k6ClQ7wW8N6OqqSyjXzpAFxqaIuk4E",
    desc: "Take Mr. Georgino's job for a day! Kinda. You will shadow Mr. Georgino and live a day in his shoes.",
    deliv: [true, true, false],
  },
  {
    pid: 4,
    name: "WINGSmate",
    price: 16,
    tags: ["Experience", "Vegan"],
    pic: "https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326263/person-running-in-the-forest.jpg",
    desc: "Challenge one of your teachers to run the mile or trail with you. Click below for the list of all available teachers",
    deliv: [true, true, false],
    link: "https://docs.google.com/document/d/e/2PACX-1vSTMNcX8JzvZN5775rpYrTlGna3t1vuTlC0iKVBRsQQyJsuvNf6IvGWVGky9qjvEcsEAKDzu3sV1S0O/pub",
  },
  {
    pid: 5,
    name: "Pickleball",
    price: 32,
    tags: ["Merch", "Vegan"],
    pic: "https://cityofukiah.com/wp-content/uploads/2022/05/pickleball-3-1920x1054-1.jpg",
    desc: "Franklin X-40 Outdoor Pickleball, USAPA Approved. Neon-green. Is it supposed to look like a pickle?",
    deliv: [true, true, false],
  },
  {
    pid: 6,
    name: "Cup Noodles [Made]",
    price: 11,
    tags: ["Food", "Hot", "Vegan"],
    pic: "https://www.adweek.com/wp-content/uploads/files/cup-noodles-hed-2015.jpg",
    desc: "Smells good. Delivered right before lunch. Vegan options available with a slightly longer wait.",
    deliv: [true, false, false],
  },
];

export default Store;
