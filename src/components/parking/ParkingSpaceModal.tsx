// ParkingDetailsModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Typography, Button } from "@mui/material";

interface ParkingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  space: {
    id: number;
    registration: string;
    entryTime: Date | null;
  };
  onDeallocate: () => void;
  onConfirmPayment: () => void;
}

const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({
  open,
  onClose,
  space,
  onDeallocate,
  onConfirmPayment,
}) => {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (space.entryTime) {
      const now = new Date();
      const diffInMs = now.getTime() - space.entryTime.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      setDuration(diffInHours);
    }
  }, [space.entryTime]);

  const handleConfirmPayment = () => {
    // Implement charge calculation logic here
    let parkingCharge = 0;
    if (duration <= 2) {
      parkingCharge = 10;
    } else {
      parkingCharge = 10 + 5 * Math.ceil(duration - 2); // $10 for first 2 hours, $5 for each additional hour
    }
    console.log(parkingCharge);
    // Make POST request to specified endpoint with parking details
    // Assuming onConfirmPayment is a callback to handle payment confirmation
    onConfirmPayment();
    onDeallocate();
    onClose();
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
        <Typography variant="h5" gutterBottom>
          Parking Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Car Registration: {space.registration}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Parking Duration: {duration.toFixed(2)} hours
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={onDeallocate}>
            Deallocate Parking Space
          </Button>

          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ParkingDetailsModal;
