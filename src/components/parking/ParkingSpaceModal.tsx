import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Typography, Button, CircularProgress } from "@mui/material";

interface ParkingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  space: {
    id: number;
    registration: string;
    entryTime: Date | null;
  };
  onDeallocate: () => void;
}

const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({
  open,
  onClose,
  space,
  onDeallocate,
}) => {
  const [duration, setDuration] = useState<number>(0);
  const [charge, setCharge] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (space.entryTime) {
      const now = new Date();
      const diffInMs = now.getTime() - space.entryTime.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      setDuration(diffInHours);
    }
  }, [space.entryTime]);

  useEffect(() => {
    let parkingCharge = 0;
    if (duration <= 2) {
      parkingCharge = 10;
    } else {
      parkingCharge = 10 + 20 * Math.ceil(duration - 2); // $10 for first 2 hours, $5 for each additional hour
    }
    setCharge(parkingCharge);
  }, [duration]);

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    // Make POST request to specified endpoint with parking details
    const requestBody = JSON.stringify({
      "car-registration": space.registration,
      charge: charge,
    });

    try {
      const response = await fetch("https://httpstat.us/200", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        console.log("Payment successfully processed.");
        onDeallocate();
        onClose();
      }
    } catch (error) {
      console.error("Error occurred while processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: Date | null) => {
    if (!time) return "";
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          Entry Time: {formatTime(space.entryTime)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Parking Duration: {duration.toFixed(2)} hours
        </Typography>
        <Typography variant="body1" gutterBottom>
          Parking Charge: ${charge}
        </Typography>

        <div style={{ marginTop: 20 }}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Back
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="primary"
                onClick={handleConfirmPayment}
              >
                Pay
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ParkingDetailsModal;
