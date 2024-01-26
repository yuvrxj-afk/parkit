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
    setRegistration(event.target.value);
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarRegistrationModal;
