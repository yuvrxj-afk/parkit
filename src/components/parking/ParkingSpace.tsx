// ParkingSpace.tsx
import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import ParkingSpaceModal from "./ParkingSpaceModal";

interface ParkingSpaceProps {
  space: {
    id: number;
    occupied: boolean;
    registration: string;
    entryTime: Date | null;
  };
  onDeallocate: () => void;
  onConfirmPayment: () => void;
}

const ParkingSpace: React.FC<ParkingSpaceProps> = ({
  space,
  onDeallocate,
  onConfirmPayment,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  const handleOpenDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          width: 50,
          height: 20,
          margin: 5,
          padding: 5,
          cursor: space.occupied ? "pointer" : "default",
          border: space.occupied ? "3px solid lime" : "2px solid transparent",
        }}
        onClick={space.occupied ? handleOpenDetailsModal : undefined}
      >
        <Typography variant="body1" align="center">
          {space.id}
        </Typography>
      </Paper>
      <ParkingSpaceModal
        open={showDetailsModal}
        onClose={handleCloseDetailsModal}
        space={space}
        onDeallocate={onDeallocate}
        onConfirmPayment={onConfirmPayment}
      />
    </>
  );
};

export default ParkingSpace;
