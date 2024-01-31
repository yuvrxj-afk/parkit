import { fireEvent, render } from "@testing-library/react";
import CarRegistrationModal from "../components/registeration/CarRegisterationModal";
import { MemoryRouter } from "react-router-dom";

test("validates registration input", () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <CarRegistrationModal
        open={true}
        onClose={() => {}}
        onRegister={() => {}}
      />
    </MemoryRouter>
  );
  const registrationInput = getByPlaceholderText("Car Number");
  fireEvent.change(registrationInput, { target: { value: "invalid" } });

  // Trigger onBlur to check validation message
    fireEvent.blur(registrationInput);
});

test("handles registration submission", () => {
  const mockRegister = jest.fn();
  const { getByPlaceholderText, getByRole } = render(
    <MemoryRouter>
      <CarRegistrationModal
        open={true}
        onClose={() => {}}
        onRegister={mockRegister}
      />
    </MemoryRouter>
  );

  const registrationInput = getByPlaceholderText("Car Number");
  const submitButton = getByRole("button", { name: /Submit/i });

  // Simulate entering a valid registration and submitting
  fireEvent.change(registrationInput, { target: { value: "AB12CD3456" } });
  fireEvent.click(submitButton);

  // Expect onRegister to be called with the correct value
  expect(mockRegister).toHaveBeenCalledWith("AB12CD3456");

  // Expect registration input to be cleared
  expect(registrationInput).toHaveValue("");
});
