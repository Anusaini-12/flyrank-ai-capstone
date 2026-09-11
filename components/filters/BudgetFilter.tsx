"use client";

import { FormEvent, useState } from "react";

const categories = ["laptops", "headphones", "phones"] as const;

type Category = (typeof categories)[number];

export type BudgetFilterValues = {
  category: Category;
  maxPrice?: number;
};

type BudgetFilterProps = {
  onSubmit: (values: BudgetFilterValues) => void;
};

type FormErrors = {
  maxPrice?: string;
  category?: string;
};

export default function BudgetFilter({ onSubmit }: BudgetFilterProps) {
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const parsedMaxPrice = maxPrice === "" ? undefined : Number(maxPrice);

    if (parsedMaxPrice !== undefined && (!Number.isFinite(parsedMaxPrice) || parsedMaxPrice <= 0)) {
      nextErrors.maxPrice = "Maximum budget must be a positive number.";
    }

    if (!categories.includes(category as Category)) {
      nextErrors.category = "Please select a category.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      category: category as Category,
      maxPrice: parsedMaxPrice,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="max-price" className="text-sm font-medium">
          Maximum budget
        </label>
        <input
          id="max-price"
          name="maxPrice"
          type="number"
          step="any"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          aria-describedby={errors.maxPrice ? "max-price-error" : undefined}
          aria-invalid={Boolean(errors.maxPrice)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.maxPrice ? (
          <p id="max-price-error" className="text-sm text-destructive">
            {errors.maxPrice}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-describedby={errors.category ? "category-error" : undefined}
          aria-invalid={Boolean(errors.category)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select a category</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p id="category-error" className="text-sm text-destructive">
            {errors.category}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Submit
      </button>
    </form>
  );
}