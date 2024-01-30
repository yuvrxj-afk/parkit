import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import ParkingSpace from "./ParkingSpace";
import CarRegistrationModal from "../registeration/CarRegisterationModal";
import { useParkingContext } from "../../context/ParkingContext";

const ParkingLot: React.FC = () => {
  const { numSpaces } = useParams();
  const spaces = numSpaces || "0";

  const {
    state: { parkingSpaces },
    dispatch,
  } = useParkingContext();

  useEffect(() => {
    const parkingSpaceDesign = Array.from(
      { length: parseInt(spaces) },
      (_m, index) => ({
        id: index + 1,
        occupied: false,
        registration: "",
        entryTime: null,
      })
    );
    dispatch({ type: "SET_PARKING_SPACES", payload: parkingSpaceDesign });
  }, [dispatch, spaces]);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  // const [parkingSpaces, setParkingSpaces] = useState(parkingSpaceDesign);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCarRegistration = (registration: string) => {
    const availableSpaces = parkingSpaces.filter((space) => !space.occupied);
    if (availableSpaces.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSpaces.length);
      const randomSpace = availableSpaces[randomIndex];
      dispatch({
        type: "ADD_CAR",
        payload: { spaceId: randomSpace.id, registration },
      });
      setShowModal(false);
    } else {
      alert("Parking is full.");
    }
  };

  const handleDeallocate = (spaceId: number) => {
    dispatch({
      type: "REMOVE_CAR",
      payload: spaceId,
    });
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
