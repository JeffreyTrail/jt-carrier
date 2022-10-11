import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
} from "@mui/material";
import * as React from "react";

const ads = [
  {
    img: 'https://iusd.org/sites/default/files/styles/article_hero/public/news_images/science_olympiad_team_jtms_2018.jpg?itok=0ZbqSQzh',
    title: "Science Olympiad",
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJkAk-5OjH6ntOXNLGE_o6YoLtC7ShVMq2McwaHCkVc8hNFdSZ6BmvoxtHe8jm3HUC0x8&usqp=CAU',
    title: 'Random Children on Field Next to Georgino',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIi8pdfmCe-N4C_mC_jHUTUY5IJ_1V80IA4Q&usqp=CAU',
    title: 'Cool Thing with Mr. Nguyen',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media/sc/d469aa8e-bcf0-4253-b71e-dd56a2d93124.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    title: 'Oranges on Vines',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media/sc/805a00ac-194f-4c6d-8b6f-7dad967f39fd.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    title: 'Oranges on Table',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media/sc/dacc10c3-706c-40cf-a948-a7de629274a1.__CR0,0,300,300_PT0_SX300_V1___.jpg',
    title: 'Happy People around Oranges',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/03d50b82-7bbf-421d-8bb7-a8f1f63e8be6.__CR0,0,220,220_PT0_SX220_V1___.jpg',
    title: 'Orange for Dinner',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/cd99bff7-4921-410f-b296-dfb7af85d993.__CR0,0,970,300_PT0_SX970_V1___.jpg',
    title: 'Aesthetic Oranges',
  },
  {
    img: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/c7324650-14ee-411b-ae49-8d69b97935bb.__CR0,0,970,600_PT0_SX970_V1___.jpg',
    title: 'Assorted Oranges',
  },
  {
    img: 'https://drive.google.com/uc?id=17BHh0lKx6LMFhI9mMtfGuG9sj7OO-_nk',
    title: 'tired cat',
  },
  // {
  //   img: 'https://drive.google.com/uc?id=1uaGJ2B2xAFabETa1vi8PRzuad02kXr8T',
  //   title: 'cat',
  // },
  // {
  //   img: 'https://drive.google.com/uc?id=14zIK4PUtukFzWm-fTASV-dyWCssMxk5v',
  //   title: 'confused cat',
  // },
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
        <Chip label="COMING SOON" color="primary" variant="outlined" size="small" sx={{marginLeft: 2}}/>
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
              subtitle={"This is a placeholder. Legit events coming soon."}
              // actionIcon={
              //   <IconButton
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.title}`}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
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
