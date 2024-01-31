import { fireEvent, render } from "@testing-library/react";
import ParkingSpace from "../components/parking/ParkingSpace";
import { MemoryRouter } from "react-router-dom";

describe("ParkingSpace Component", () => {
  test("renders parking space correctly when occupied", () => {
    const space = {
      id: 1,
      occupied: true,
      registration: "ABC123",
      entryTime: new Date(),
    };
    const onDeallocateMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <ParkingSpace space={space} onDeallocate={onDeallocateMock} />
      </MemoryRouter>
    );

    const parkingSpaceElement = getByText(space.id.toString()).parentElement;
    expect(parkingSpaceElement).toBeInTheDocument();
    expect(parkingSpaceElement).toHaveStyle("background-color: lime");
  });

  test("renders parking space correctly when not occupied", () => {
    const space = {
      id: 1,
      occupied: false,
      registration: "",
      entryTime: null,
    };
    const onDeallocateMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <ParkingSpace space={space} onDeallocate={onDeallocateMock} />
      </MemoryRouter>
    );

    const parkingSpaceElement = getByText(space.id.toString()).parentElement;
    expect(parkingSpaceElement).toBeInTheDocument();
    expect(parkingSpaceElement).toHaveStyle("background-color: white");
  });
});

describe("handleModal", () => {
  test("opens details modal when handleOpenDetailsModal is called", () => {
    const space = {
      id: 1,
      occupied: true,
      registration: "ABC123",
      entryTime: new Date(),
    };
    const onDeallocateMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <ParkingSpace space={space} onDeallocate={onDeallocateMock} />
      </MemoryRouter>
    );

    const parkingSpaceElement = getByText(space.id.toString());
    fireEvent.click(parkingSpaceElement);
  });

  test("closes details modal when handleCloseDetailsModal is called", () => {
    const space = {
      id: 1,
      occupied: true,
      registration: "ABC123",
      entryTime: new Date(),
    };
    const onDeallocateMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <ParkingSpace space={space} onDeallocate={onDeallocateMock} />
      </MemoryRouter>
    );

    const parkingSpaceElement = getByText(space.id.toString());
    fireEvent.click(parkingSpaceElement);

    fireEvent.click(getByText("Back"));
  });
});
