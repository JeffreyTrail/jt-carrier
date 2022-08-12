import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Help() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Typography variant="h5" sx={rowStyle}>Frequently Asked Questions</Typography>
      <br />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="a1-content"
          id="q1-header"
        >
          <Typography>
            1. How do I win a prize with my WINGS Ticket?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: There are 3 different ways for you to win:
            <ol>
            <li>Each week, there is a drawing for each homeroom. The prize is distributed by ASB each week in homeroom.</li>
            <li>Each week, we hold a drawing for each of the WINGS letters for all tickets submitted in the whole school. Pay close attention during morning announcements. </li>
            {/*<li>This last one is not a drawing. Some WINGS tickets are just special - they're golden tickets, which will reward you immediately after you redeem them.</li>*/}
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="q2-content"
          id="q2-header"
        >
          <Typography>2. What is considered a week?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Each week starts at 0:00 on Tuesday and ends by midnight of the following Monday.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="q3-content"
          id="q3-header"
        >
          <Typography>3. When do you do the drawings?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Homeroom drawings are conducted every Tuesday! Your homeroom reps will come to homeroom with the prize and announce the winner. Letter drawing winners will find out on Fridays in the morning announcements.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="q3-content"
          id="q3-header"
        >
          <Typography>4. What are the prizes?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Homeroom drawing prizes change every week; it's listed under the Stats tab. Letter drawing winners get to choose one of many gift cards.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="q3-content"
          id="q3-header"
        >
          <Typography>5. What do I do with the ticket after?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Hold onto them! For one thing, they are a memory of your time at JTMS; for another, they might come in handy later on this year...
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="q3-content"
          id="q3-header"
        >
          <Typography>6. Where can I find more information?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Read more in <a href="https://docs.google.com/presentation/d/1H-LzoqsSk9vMl3m1fxmCqVXjY4k1E_7nsb68xoCAiqU/edit?usp=sharing" target="_blank" rel="noopener">this slides deck here</a>. If you have any further questions, please submit them to <a href="https://forms.gle/t9R29o6ZJXDM7NE37" target="_blank" rel="noopener">the feedback form</a>!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const rowStyle = {
  width: "100%",
  flexGrow: "row",
  display: "flex",
  marginTop: 3,
};

export default Help;
