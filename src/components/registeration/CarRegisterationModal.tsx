import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CarRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (registration: string) => void;
}

const CarRegistrationModal: React.FC<CarRegistrationModalProps> = ({
  open,
  onClose,
  onRegister,
}) => {
  const [registration, setRegistration] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    setRegistration(enteredValue);
  };

  const handleBlur = () => {
    const isValid = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(registration);
    if (!isValid) {
      alert("Please enter a valid car registration in the given format");
    }
  };

  const handleSubmit = () => {
    onRegister(registration);
    setRegistration("");
  };

  return (
    <Dialog open={open} sx={{ height: "550px" }} onClose={onClose}>
      <DialogTitle>Add Car Registration</DialogTitle>
      <DialogContent sx={{ padding: "20px" }}>
        <TextField
          placeholder="Car Number"
          value={registration}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={"MP09UV0007"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={!registration}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarRegistrationModal;
