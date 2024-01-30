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
}

const ParkingSpace: React.FC<ParkingSpaceProps> = ({ space, onDeallocate }) => {
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
          width: 100,
          height: 50,
          margin: 5,
          padding: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: space.occupied ? "pointer" : "default",
          backgroundColor: space.occupied ? "lime" : " white",
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
      />
    </>
  );
};

export default ParkingSpace;
