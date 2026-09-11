import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";

import BudgetFilter from "./BudgetFilter";

describe("BudgetFilter", () => {
  it("submits the selected category and budget", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<BudgetFilter onSubmit={onSubmit} />);

    await user.type(screen.getByRole("spinbutton", { name: /budget/i }), "1200");
    await user.selectOptions(screen.getByRole("combobox", { name: /category/i }), "laptops");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      category: "laptops",
      maxPrice: 1200,
    });
  });

  it("shows an error and does not submit when no category is selected", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<BudgetFilter onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("Please select a category.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows an error when the budget is negative", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<BudgetFilter onSubmit={onSubmit} />);

    await user.type(screen.getByRole("spinbutton", { name: /budget/i }), "-100");
    await user.selectOptions(screen.getByRole("combobox", { name: /category/i }), "phones");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      screen.getByText("Maximum budget must be a positive number."),
    ).toBeInTheDocument();
  });
});