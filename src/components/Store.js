import {
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
  Stack,
} from "@mui/material";
import * as React from "react";

function Store() {
  const buy = (itemn) => {
    console.log("This guy wants to buy:");
    console.log(catalogue[itemn]);
  };

  return (
    <Box sx={{ marginBottom: 5 }}>
      <Typography variant="h5" sx={rowStyle}>
        The WINGStore
      </Typography>
      <br />
      <Grid container spacing={1} alignItems="stretch">
        {catalogue.map((item, index) => {
          return (
            <Grid item xs={4}>
              <Card raised>
                <CardHeader
                  action={
                    <Typography variant="h3" sx={{ marginRight: 1 }}>
                      {item.price}
                    </Typography>
                  }
                  title={item.name}
                  titleTypographyProps={{ variant: "h6" }}
                  subheader={
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                      {item.tags.map((tag) => {
                        return (
                          <Chip
                            label={tag}
                            variant="outlined"
                            color={tag === "Vegan" ? "success" : "warning"}
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
                    variant="contained"
                    onClick={() => buy(index)}
                  >
                    Place Order
                  </Button>
                </CardActions>
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

const catalogue = [
  {
    name: "Can of Pepsi",
    price: 6,
    tags: ["Drink", "Vegan"],
    pic: "https://www.snackhistory.com/wp-content/uploads/2022/02/Pepsi-3.jpg",
    desc: "Sorry we don't have coke. Is Pepsi okay? Same-day pick up available. Sugar-free option available.",
  },
  {
    name: "Oereos [Pack of 2]",
    price: 3,
    tags: ["Food", "Vegan"],
    pic: "https://static.onecms.io/wp-content/uploads/sites/19/2021/08/12/oreo-hero.jpg",
    desc: "Sometimes you just CRAVE an oreo. You don't need a lot; just one or two. Same-day pick up available.",
  },
  {
    name: "Be Georgino for a Day",
    price: 52,
    tags: ["Experience", "Vegan"],
    pic: "https://drive.google.com/uc?id=1X1k6ClQ7wW8N6OqqSyjXzpAFxqaIuk4E",
    desc: "Take Mr. Georgino's job for a day! Kinda. You will shadow Mr. Georgino and live a day in his shoes.",
  },
  {
    name: "WINGSmate",
    price: 16,
    tags: ["Experience", "Vegan"],
    pic: "https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326263/person-running-in-the-forest.jpg",
    desc: "Challenge one of your teachers running the mile or trail with you. Click below for the list of all available teachers",
    link: "https://docs.google.com/document/d/e/2PACX-1vSTMNcX8JzvZN5775rpYrTlGna3t1vuTlC0iKVBRsQQyJsuvNf6IvGWVGky9qjvEcsEAKDzu3sV1S0O/pub",
  },
  {
    name: "Pickleball",
    price: 32,
    tags: ["Merch", "Vegan"],
    pic: "https://cityofukiah.com/wp-content/uploads/2022/05/pickleball-3-1920x1054-1.jpg",
    desc: "Franklin X-40 Outdoor Pickleball, USAPA Approved. Neon-green. Is it supposed to look like a pickle?",
  },
  {
    name: "Cup Noodles [Made]",
    price: 11,
    tags: ["Food", "Cooked Hot", "Vegan"],
    pic: "https://www.adweek.com/wp-content/uploads/files/cup-noodles-hed-2015.jpg",
    desc: "Smells good. Delivered right before lunch. Vegan options available with a slightly longer wait.",
  },
];

export default Store;
