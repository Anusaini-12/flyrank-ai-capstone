import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";

import ToolProductCard from "./ToolProductCard";

const sampleProduct = {
  link: "https://example.com/product",
  name: "AeroBook Air 14",
  price: 899,
  batteryLife: "18 hours",
  matchReasons: ["long battery life", "lightweight"],
};

describe("ToolProductCard", () => {
  it("renders the product name, price, and a match reason", () => {
    render(<ToolProductCard product={sampleProduct} />);

    expect(screen.getByRole("heading", { name: sampleProduct.name })).toBeInTheDocument();
    expect(screen.getByText("$899")).toBeInTheDocument();
    expect(screen.getByText("long battery life")).toBeInTheDocument();
  });

  it("renders without crashing when there are no match reasons", () => {
    render(
      <ToolProductCard
        product={{ ...sampleProduct, matchReasons: [] }}
      />,
    );

    expect(screen.getByRole("heading", { name: sampleProduct.name })).toBeInTheDocument();
  });
});