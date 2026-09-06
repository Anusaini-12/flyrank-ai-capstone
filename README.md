# FlyRank AI Front-end AI Engineering Capstone

This repository is being developed as part of the FlyRank AI Front-end AI Engineering track.

## Overview

This project will explore the integration of AI capabilities into a modern web application, with a focus on useful user experiences, clean frontend architecture, and practical AI-assisted development.

## Planned Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- AI/LLM APIs

## `searchProducts` Tool

The `searchProducts` tool searches the mock product catalog by category, budget, and shopper priorities.

### Input Schema

The tool accepts a Zod object with these fields:

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | The product category to search for, such as laptops or headphones. |
| `maxPrice` | `number` (optional) | The maximum acceptable price for the product. |
| `priorities` | `string[]` (optional) | The product qualities that matter most, such as battery life or budget. |

### Return Shape

The tool returns an object containing a `products` list with up to three matching products:

```ts
{
	products: Array<{
		id: string;
		name: string;
		price: number;
		batteryLife: string;
		matchReasons: string[];
	}>;
}
```

Products also include their catalog `category` internally, while the fields above are the product data used by the UI.

## Development

The project is currently in the initial setup phase. The technology choices and project scope may evolve as the capstone develops.

## Goals

- Build a practical AI-powered web application
- Apply AI-assisted development workflows
- Follow maintainable frontend development practices
- Document the development process and decisions

## Status

The repository is in the initial setup phase and does not contain a runnable application yet.

## Getting Started

The application scaffold has not been initialized yet. Setup and run instructions will be added once the Next.js project is in place.

## Project Structure

The project will be organized around reusable frontend components, application features, AI integrations, and supporting utilities as development progresses.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
