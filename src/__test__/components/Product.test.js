import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "../../components/Product";

test("renders product information correctly", () => {
  const product = {
    name: "Example Product",
    color: "Red",
    size: "Large",
    price: 29.99,
    description: "A sample product description.",
  };

  render(<Product product={product} />);

  expect(screen.getByText("Example Product")).toBeInTheDocument();
  expect(screen.getByText("Color: Red")).toBeInTheDocument();
  expect(screen.getByText("Size: Large")).toBeInTheDocument();
  expect(
    screen.getByText("Description: A sample product description.")
  ).toBeInTheDocument();
  expect(screen.getByText("$29.99")).toBeInTheDocument();

  const productImage = screen.getByAltText("Product");
  expect(productImage).toBeInTheDocument();
  expect(productImage).toHaveAttribute("alt", "Product");
});
