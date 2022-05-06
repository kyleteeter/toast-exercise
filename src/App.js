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
  const [formSubmission, setformSubmission] = useState();
  const [likedFormSubmissions, setLikedFormSubmissions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getLikedSubmissions() {
      try {
        const response = await fetchLikedFormSubmissions();
        setLikedFormSubmissions(response);
      } catch (error) {
        console.log(
          `Warning: There has been a ${error.message} while fetching the liked submissions.`
        );
      }
    }
    getLikedSubmissions();
  }, [likedFormSubmissions]);

  onMessage((form) => {
    setformSubmission(form);
    setOpen(true);
  });

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
        storeLikedSubmissions();
      }
    }
    storeLikedSubmissions();
  };

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
        <Content likedFormSubmissions={likedFormSubmissions.formSubmissions} />
      </Container>
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
