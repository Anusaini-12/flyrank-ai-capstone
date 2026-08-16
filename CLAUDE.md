# Project Instructions

## Project

This is a capstone project for the FlyRank AI Front-end AI Engineering track.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- AI/LLM APIs

## Development Guidelines

- Use TypeScript for application code.
- Prefer functional React components.
- Keep components small, reusable, and maintainable.
- Use clear and descriptive names.
- Follow the existing project structure and conventions.
- Avoid unnecessary dependencies.
- Keep API keys and secrets out of source code.
- Store secrets in environment variables.
- Build responsive and accessible interfaces.
- Prefer simple solutions over unnecessary complexity.

## AI Development Guidelines

- Understand generated code before using it.
- Do not claim that functionality has been implemented when it has not.
- Review AI-generated changes before committing them.
- Ask for explanations when generated code is unclear.
- Keep the project documentation accurate as the project evolves.

## Git Conventions

Use Conventional Commits.

Examples:

- feat: add feature
- fix: resolve bug
- docs: update documentation
- refactor: simplify implementation
- chore: update project configuration
- test: add tests

## Project-Specific Rules

- Forms must use reusable `FormField` components for labels, hints, required
  indicators, and validation errors instead of duplicating field markup.

- Validation logic must be separated into individual typed validation
  functions for each field and a form-level validation function.

- Every new validation rule must have a corresponding verification case in
  `frontend/scripts/test-validation.mts`.

- Run `npm run lint` and `npm run build` after significant AI-generated
  changes before considering the implementation complete.

- Do not accept AI-generated changes to existing metadata, configuration, or
  project documentation without checking that they preserve the existing
  project requirements.