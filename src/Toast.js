import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Toast({ handleCloseToast, formSubmission, open, handleLikeToast }) {
  

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
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseToast}
      message={formSubmission?.data.firstName}
      action={action}
    />
  );
}

export default Toast;
