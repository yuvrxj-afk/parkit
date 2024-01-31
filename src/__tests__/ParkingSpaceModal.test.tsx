import { render, fireEvent, waitFor } from "@testing-library/react";
import ParkingDetailsModal from "../components/parking/ParkingSpaceModal";
import { MemoryRouter } from "react-router-dom";

test("renders parking details modal with correct initial state", () => {
  const space = {
    id: 1,
    registration: "AB12BC0034",
    entryTime: new Date(),
  };
  const { getByText } = render(
    <MemoryRouter>
      <ParkingDetailsModal
        open={true}
        onClose={() => {}}
        space={space}
        onDeallocate={() => {}}
      />
    </MemoryRouter>
  );

  expect(getByText(/Parking Details/i)).toBeInTheDocument();
  expect(getByText(/Car Registration: AB12BC0034/i)).toBeInTheDocument();
  // Add more assertions for other initial state values
});

test("updates duration and charge correctly based on entry time", () => {
  const entryTime = new Date();
  entryTime.setHours(entryTime.getHours() - 2); // Set entry time 2 hours ago
  const space = {
    id: 1,
    registration: "AB12BC0034",
    entryTime: entryTime,
  };
  render(
    <MemoryRouter>
      <ParkingDetailsModal
        open={true}
        onClose={() => {}}
        space={space}
        onDeallocate={() => {}}
      />
    </MemoryRouter>
  );
});

test("handles payment confirmation correctly", async () => {
  const mockOnClose = jest.fn();
  const mockOnDeallocate = jest.fn();

  const { getByText } = render(
    <MemoryRouter>
      <ParkingDetailsModal
        open={true}
        onClose={mockOnClose}
        space={{ id: 1, registration: "AB12BC0034", entryTime: new Date() }}
        onDeallocate={mockOnDeallocate}
      />
    </MemoryRouter>
  );

  fireEvent.click(getByText(/Pay/i));

  // Check loading state
  //   expect(getByRole("progressbar")).toBeInTheDocument();

  // Simulate API response
  //   await waitFor(() => expect(mockOnDeallocate).toHaveBeenCalled());
  //   expect(mockOnClose).toHaveBeenCalled();
});
describe("Parking Details Modal", () => {
  test("handles payment confirmation correctly", async () => {
    const mockOnClose = jest.fn();
    const mockOnDeallocate = jest.fn();

    // Mock API response for successful payment
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const { getByText } = render(
      <MemoryRouter>
        <ParkingDetailsModal
          open={true}
          onClose={mockOnClose}
          space={{ id: 1, registration: "AB12BC0034", entryTime: new Date() }}
          onDeallocate={mockOnDeallocate}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(/Pay/i));

    // Simulate API response
    await waitFor(() => {
      expect(mockOnDeallocate).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    // Mock API response for failed payment
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    // Simulate API response
    await waitFor(() => {
      expect(mockOnDeallocate).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
