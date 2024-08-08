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
  Collapse,
  FormControlLabel,
  // Radio,
  // FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  // RadioGroup,
} from "@mui/material";
import * as React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function Store({ wallet, setWallet, sid, setNotif }) {
  // expand stores the pid of the item option that is currently expanded
  const [expand, setExpand] = React.useState(-1);
  const [options, setOptions] = React.useState([]);
  const [catalogue, setCatalogue] = React.useState([]);
  const [status, setStatus] = React.useState("off");

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

  // calculate the date for next Thurs
  let d = new Date();
  d.setDate(d.getDate() + (4 + 7 - (d.getDay() || 7)));
  let deliv = d.toString();
  // Get rid of unnecessary year and time info
  deliv = deliv.substring(4, deliv.indexOf("202") - 1);

  const buy = (itemn) => {
    fetch(
      "https://wings-carrier.herokuapp.com/buy/" +
        sid +
        "/" +
        itemn +
        "/" +
        deliv +
        "/" +
        (options.length === 0 ? "NA" : options.join(", "))
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.rcode !== 0) {
          setNotif(["error", data.msg]);
        } else {
          setWallet(
            wallet - catalogue.find((product) => product.pid === itemn).price
          );
          setNotif([
            "success",
            "Your order of " +
              catalogue.find((product) => product.pid === itemn).name +
              " has been placed. ASB will deliver it by next Thursday " +
              deliv +
              ".",
          ]);
          setOptions([]);
          setExpand(-1);
        }
      });
  };

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

      {status === "off" ? (
        <Alert severity="error">
          The WINGStore is temporarily closed. We'll be back soon with exciting
          excitement.
        </Alert>
      ) : (
        <Grid
          container
          spacing={1}
          alignItems="stretch"
          sx={{ marginBottom: 3, marginTop: 1 }}
        >
          {catalogue
            .filter((item) => item.sold !== "hidden")
            .map((item, index) => {
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
                        disabled={item.price > wallet || item.sold === "out"}
                        endIcon={
                          expand === item.pid ? <ExpandLess /> : <ExpandMore />
                        }
                      >
                        {item.sold === "out" ? "sold out" : "order"}
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
      )}
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
