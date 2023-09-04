import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import OrderDetails from "../../pages/OrderDetails";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("OrderDetails Component", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        clientProgress: {
          invoiceNumber: "123456",
          receiptVoucher: "ABC123",
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders order details correctly", () => {
    const products = [
      {
        id: 1,
        name: "Product A",
        color: "Red",
        size: "M",
        price: 19.99,
        description: "Description A",
      },
    ];

    render(<OrderDetails openModal={() => {}} products={products} />);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toHaveTextContent("$19.99");

    expect(screen.getByText("Invoice Number: 123456")).toBeInTheDocument();
    expect(screen.getByText("Receipt Voucher: ABC123")).toBeInTheDocument();
    expect(screen.getByText("Total Paid:")).toBeInTheDocument();

    expect(screen.getByText("Pay with Credit Card")).toBeInTheDocument();
  });
});
