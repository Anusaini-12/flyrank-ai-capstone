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

## Lessons from AI Workflow Comparison

- When importing .ts/.mts files in scripts, omit the file extension in the import path — this project isn't configured to allow TypeScript extensions in imports (causes TS5097).
- After any AI-generated change to layout.tsx or app metadata, verify the title/description weren't reset to Next.js defaults ("Create Next App") — check this explicitly, don't assume it's untouched.
- For forms with multiple validated fields, prefer one validator function per field (validateEmail, validateDisplayName, etc.) over a single generic validation function — improves type safety and makes each rule independently testable.
- After any AI-generated change, run a full production build (npm run build), not just the dev server — dev mode didn't surface the TS5097 error, the production build did.