import { Button, IconButton, Snackbar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Toast({ handleCloseToast, formSubmission, open, handleLikeToast }) {
  // This function will render a message in text within the snackbar aka toast.
  const displayMessage = (data) => (
    <>
      <p style={{ fontWeight: "bold" }}>
        {data?.firstName} {data?.lastName}
      </p>
      <p>{data?.email}</p>
    </>
  );

  // This function renders the action item on the snackbar/Toast. In this case there are two
  // actions a user could take, either closing the toast or liking the submission. 
  const action = (
    <>
      <Button color='primary' size='small' onClick={handleLikeToast}>
        LIKE
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleCloseToast}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* This renders the actual snackbar with it's corresponding props. In this case
      I left the default positioning of the snackbar because it is already full width on mobile. */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={displayMessage(formSubmission?.data)}
        action={action}
      />
    </Stack>
  );
}

export default Toast;
