import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import ParkingSpace from "./ParkingSpace";
import CarRegistrationModal from "../registeration/CarRegisterationModal";

const ParkingLot: React.FC = () => {
  const { numSpaces } = useParams();
  const spaces = numSpaces || "0";

  // Allocating spaces
  const parkingSpaceDesign = Array.from(
    { length: parseInt(spaces) },
    (_m, index) => ({
      id: index + 1,
      occupied: false,
      registration: "",
      entryTime: null,
    })
  );
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [parkingSpaces, setParkingSpaces] = useState(parkingSpaceDesign);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCarRegistration = (registration: string) => {
    const availableSpace = parkingSpaces.find((space) => !space.occupied);
    if (availableSpace) {
      const updatedSpaces = parkingSpaces.map((space) =>
        space.id === availableSpace.id
          ? { ...space, occupied: true, registration }
          : space
      );
      setParkingSpaces(updatedSpaces);
      setShowModal(false);
    } else {
      alert("Parking is fullll.");
    }
  };

  const handleDeallocate = (spaceId: number) => {
    const updatedSpaces = parkingSpaces.map((space) =>
      space.id === spaceId
        ? { ...space, occupied: false, registration: "", entryTime: null }
        : space
    );

    setParkingSpaces(updatedSpaces);
  };

  const handleConfirmPayment = () => {
    // Handle payment confirmation logic here
    console.log("Payment confirmed.");
  };

  const isParkingLotFull = parkingSpaces.every((space) => space.occupied);

  return (
    <Container>
      <Box display={"flex"} justifyContent={"space-between"} mt={"10px"}>
        <Typography variant="h4" gutterBottom>
          Parking Lot - {numSpaces} Spaces
        </Typography>
        <Button
          variant="contained"
          disabled={isParkingLotFull}
          onClick={handleOpenModal}
          sx={{ mt: 2 }}
        >
          Add Car Registration
        </Button>
      </Box>
      <div>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {parkingSpaces.map((spaceNumber, i) => (
            <ParkingSpace
              key={i}
              onConfirmPayment={handleConfirmPayment}
              onDeallocate={() => handleDeallocate(spaceNumber.id)}
              space={spaceNumber}
            />
          ))}
        </Container>
      </div>
      <CarRegistrationModal
        open={showModal}
        onClose={handleCloseModal}
        onRegister={handleCarRegistration}
      />
    </Container>
  );
};

export default ParkingLot;
