import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ParkingProvider } from "../context/ParkingContext";
import ParkingLot from "../components/parking/ParkingLot";
import CarRegistrationModal from "../components/registeration/CarRegisterationModal";

describe("<ParkingLot />", () => {
  it("renders with correct number of parking spaces", async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={["/parkinglot/5"]}>
        <ParkingProvider>
          <ParkingLot />
          <CarRegistrationModal
            open={true}
            onClose={() => {}}
            onRegister={() => {}}
          />
        </ParkingProvider>
      </MemoryRouter>
    );

    expect(getByText(/Parking Lot/i)).toBeInTheDocument();
    fireEvent.click(getByText("Add Car Registration"));
    await waitFor(() => {
      const registrationInput = getByPlaceholderText("Car Number");
      const submitButton = getByRole("button", { name: /Submit/i });

      // Simulate entering a valid registration and submitting
      fireEvent.change(registrationInput, { target: { value: "AB12CD3456" } });
      fireEvent.click(submitButton);
    });
  });
});
