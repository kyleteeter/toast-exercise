import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";


export default function Content({ likedFormSubmissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant='h4' marginBottom={3}>
        Liked Form Submissions
      </Typography>
      {/* Here we are setting up the grid container and then looping over the items in the object
      to render each submission in a card element.  */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {likedFormSubmissions
          ? Object.values(likedFormSubmissions).map((submission) => (
              <Grid item xs={12}>
                <Card key={submission.id}>
                  <CardContent>
                    <Typography variant='h5' component='div'>
                      {submission.data.firstName} {submission.data.lastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                      {submission.data.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
            // If the likedFormSubmissions state is still being reteived it this will breifly render a loading message.
          : <Grid item xs={6}>Loading...</Grid>}
      </Grid>
    </Box>
  );
}
