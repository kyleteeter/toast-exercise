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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {likedFormSubmissions
          ? Object.values(likedFormSubmissions).map((submission) => (
              <Grid item xs={6}>
                <Card sx={{ minWidth: 200 }} key={submission.id}>
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
          : <Grid item xs={6}>Loading...</Grid>}
      </Grid>
    </Box>
  );
}
