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
import { catalogue } from "./Catalogue";

function Store({ wallet, setWallet, sid, setNotif }) {
  // expand stores the pid of the item option that is currently expanded
  const [expand, setExpand] = React.useState(-1);
  const [deliv, setDeliv] = React.useState("ready");

  const buy = (itemn) => {
    fetch(
      "https://wings-carrier.herokuapp.com/buy/" +
        sid +
        "/" +
        itemn +
        "/" +
        deliv +
        (deliv === "thurs" ? nextThurs : "")
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.rcode !== 0) {
          setNotif(["error", data.msg]);
        } else {
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
        }
      });
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
        How to use the WINGStore?{" "}
        <a
          href="https://docs.google.com/presentation/d/1q-KJYjRUWTL7tviBwHbPr_1wQQ52IH1ya_vYL6GRm9Y/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Learn more here.
        </a>
        <br />
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
                          label="When Ready"
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

export default Store;
