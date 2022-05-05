import { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import {
  fetchLikedFormSubmissions,
  onMessage,
  saveLikedFormSubmission,
} from "./service/mockServer";
import Toast from "./Toast";

function App() {
  const [formSubmission, setformSubmission] = useState();
  const [likedFormSubmissions, setLikedFormSubmissions] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getLikedSubmissions() {
      const response = await fetchLikedFormSubmissions();
      if (response.status === 200) {
        setLikedFormSubmissions(response);
      } else {
        getLikedSubmissions();
      }
    }
    getLikedSubmissions();
  }, [likedFormSubmissions, open]);

  onMessage((form) => {
    setformSubmission(form);
    setOpen(true);
  });

  const handleLikeToast = () => {
    saveLikedFormSubmission(formSubmission);
    setOpen(false);
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
