import { useEffect, useState } from "react";
import {
  fetchLikedFormSubmissions,
  onMessage,
  saveLikedFormSubmission,
} from "./service/mockServer";
import Header from "./Header";
import Content from "./Content";
import Toast from "./Toast";
import Container from "@mui/material/Container";

function App() {
  // I choose to manage all three states in this file because it is the highest level
  // component and I can easily pass props down to the children.
  const [formSubmission, setformSubmission] = useState();
  const [likedFormSubmissions, setLikedFormSubmissions] = useState({});
  const [open, setOpen] = useState(false);

  // I am using the "useEffect" hook here to get liked submissions from the server after
  // the component is rendered and every time the "likeFormSubmissions" state is updated.
  useEffect(() => {
    async function getLikedSubmissions() {
      try {
        const response = await fetchLikedFormSubmissions();
        setLikedFormSubmissions(response);
        // Here I am catching the error from the server and logging it to the console.
      } catch (error) {
        console.log(
          `Warning: There has been a ${error.message} while fetching the liked submissions.`
        );
      }
    }
    getLikedSubmissions();
  }, [likedFormSubmissions]);

  // I am using the "onMessage" callback to set the "formSubmission" state with the form data
  // that is returned from the server when a new form is submitted.
  onMessage((form) => {
    setformSubmission(form);
    setOpen(true);
  });

  // This handler is much like the async function used to get liked form submissions but in this
  // case the handler is also opening a Toast.
  const handleLikeToast = () => {
    async function storeLikedSubmissions() {
      try {
        const response = await saveLikedFormSubmission(formSubmission);
        setLikedFormSubmissions(response);
        setOpen(false);
      } catch (error) {
        console.log(
          `Warning: There has been a ${error.message}. While submitting you LIKE.`
        );
        // If the toast like handlers returns an error, I am calling the "storeLikedSubmissions"
        // function again so that the user doesn't have to click the "LIKED" button multiple times
        // due to a server error and we can ensure the timeout on the toast will not affect their
        // abilitiy to like the submission.
        storeLikedSubmissions();
      }
    }
    storeLikedSubmissions();
  };

  // This handler does just what it says, it closes the Toast when called.
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Container>
        {/* I am passing down the likedFormSubmissions from state to be rendered in the content section. 
        There wasn't any need to send the full object so I am just sending the actual formSubmissions. */}
        <Content likedFormSubmissions={likedFormSubmissions.formSubmissions} />
      </Container>
      {/* Here I am passing the relevant props to the new Toast component. */}
      <Toast
        handleCloseToast={handleCloseToast}
        formSubmission={formSubmission}
        open={open}
        handleLikeToast={handleLikeToast}
      />
    </>
  );
}

export default App;
