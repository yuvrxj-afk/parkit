import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Page from "../components/Page";

const MockPage = () => {
  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
};

describe("<Page />", () => {
  it("updates numSpaces state correctly on valid input", () => {
    const { getByPlaceholderText } = render(<MockPage />);
    const input = getByPlaceholderText(
      "Enter the Parking Space"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
  });

  it("clears numSpaces state on invalid input", () => {
    const { getByPlaceholderText } = render(<MockPage />);
    const input = getByPlaceholderText(
      "Enter the Parking Space"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe("");
  });

  it("navigates to parking lot page on valid form submission", () => {
    const { getByPlaceholderText, getByText } = render(<MockPage />);
    const input = getByPlaceholderText(
      "Enter the Parking Space"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(getByText("Proceed"));
    expect(window.location.pathname).toBe("/parkinglot/10");
  });

  it("shows alert on invalid form submission", () => {
    const { getByPlaceholderText, getByText } = render(<MockPage />);
    const input = getByPlaceholderText(
      "Enter the Parking Space"
    ) as HTMLInputElement;
    window.alert = jest.fn();
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(getByText("Proceed"));
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid number of parking spaces."
    );
  });
});
