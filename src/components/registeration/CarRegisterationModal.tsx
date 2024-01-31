import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";

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
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <h2>Add Car</h2>
        <TextField
          placeholder="Car Number"
          value={registration}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText="required form - MP09UV0007*"
        />
        <div style={{ marginTop: 20 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!registration}
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CarRegistrationModal;
