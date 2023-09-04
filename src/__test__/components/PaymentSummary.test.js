import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import PaymentSummary from "../../components/PaymentSummary";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("PaymentSummary Component", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        clientProgress: {
          paymentData: {
            number: "1234 5678 9012 3456",
            name: "John Doe",
            expiry: "12/24",
            cvv: "123",
          },
          invoiceNumber: "987654",
          receiptVoucher: "ABC123",
          cart: [
            {
              id: 1,
              name: "Product A",
              price: 19.99,
            },
            {
              id: 2,
              name: "Product B",
              price: 29.99,
            },
          ],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders payment summary correctly", () => {
    render(<PaymentSummary onConfirmPayment={() => {}} onClose={() => {}} />);

    expect(screen.getByText("Payment Summary")).toBeInTheDocument();
    expect(
      screen.getByText("Card Number: 1234 5678 9012 3456")
    ).toBeInTheDocument();
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Expire Date: 12/24")).toBeInTheDocument();
    expect(screen.getByText("CVV: 123")).toBeInTheDocument();
    expect(screen.getByText("Invoice Number: 987654")).toBeInTheDocument();
    expect(screen.getByText("Receipt Voucher: ABC123")).toBeInTheDocument();
    expect(screen.getByText("Order Details:")).toBeInTheDocument();
    expect(screen.getByText("Product A - Price: $19.99")).toBeInTheDocument();
    expect(screen.getByText("Product B - Price: $29.99")).toBeInTheDocument();
  });

  test("calls onConfirmPayment and onClose when buttons are clicked", () => {
    const mockOnConfirmPayment = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <PaymentSummary
        onConfirmPayment={mockOnConfirmPayment}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText("Confirm"));
    fireEvent.click(screen.getByText("x"));

    expect(mockOnConfirmPayment).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
