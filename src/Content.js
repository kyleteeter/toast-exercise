import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Content({ likedFormSubmissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant='h4'>Liked Form Submissions</Typography>
      {likedFormSubmissions
        ? Object.values(likedFormSubmissions).map((submission) => (
            <Typography
              variant='body1'
              sx={{ fontStyle: "italic", marginTop: 1 }}
              key={submission.id}
            >
              {submission.data.firstName}
            </Typography>
          ))
        : null}
    </Box>
  );
}
