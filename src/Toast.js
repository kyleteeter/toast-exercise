import { Button, IconButton, Snackbar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Toast({ handleCloseToast, formSubmission, open, handleLikeToast }) {
  const displayMessage = (data) => (
    <>
      <p style={{ fontWeight: "bold" }}>
        {data?.firstName} {data?.lastName}
      </p>
      <p>{data?.email}</p>
    </>
  );

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
