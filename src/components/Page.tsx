import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";

const Page: React.FC = () => {
  const [numSpaces, setNumSpaces] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();

    const isValid = /^[1-9][0-9]*$/.test(enteredValue);

    if (isValid) {
      setNumSpaces(enteredValue);
    } else {
      setNumSpaces("");
    }
  };

  const handleSubmit = () => {
    if (parseInt(numSpaces) > 0) {
      navigate(`/parkinglot/${numSpaces}`);
    } else {
      alert("Please enter a valid number of parking spaces.");
    }
  };

  return (
    <div className="pageWrapper">
      <Container
        sx={{
          border: "2px solid #313131",
          borderRadius: "8px",
          padding: "30px",
          zIndex: "1",
          background: `rgba(0, 0, 0, 0.83)`,
          color: "white",
          display: "flex",
          flexDirection: "column",
          width: "30%",
          alignItems: "left",
        }}
      >
        <Typography variant="h4" fontWeight={"600"} gutterBottom>
          Welcome to Parking Manager
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please enter the number of parking spaces
        </Typography>
        <TextField
          type="text"
          value={numSpaces}
          onChange={handleChange}
          placeholder="Enter the Parking Space"
          id="parking-create-text-input"
          // ID for the text input
          inputProps={{ style: { color: "white" } }}
          sx={{
            mb: 2,
            borderRadius: "10px",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          id="parking-create-submit-button"
          sx={{ height: "100%", width: "50%", padding: "12px" }}
        >
          Proceed
        </Button>
      </Container>
    </div>
  );
};

export default Page;
