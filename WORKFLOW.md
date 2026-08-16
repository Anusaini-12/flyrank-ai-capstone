# AI Development Workflow Comparison

## Feature

The feature used for this experiment was a settings form with client-side
validation. It includes display name, email, bio, default AI model,
temperature, and email notification preferences.

## Round 1 — Vague Prompt

Round 1 was intentionally created from a vague prompt with minimal context:

> Build a settings form with validation.

The implementation was functional and included a settings page, a reusable
FormField component, form state management, and validation. However, the
requirements were mostly left for the AI to decide. This meant that I had to
review the generated behavior manually rather than having clearly defined
requirements and verification criteria.

The implementation was saved on the `round-1-vague` branch.

## Round 2 — Precise Prompt

Round 2 used a more detailed prompt containing project context, file
references, constraints, expected behavior, and an explicit verification
step.

The resulting implementation was more structured. `SettingsForm.tsx`
increased from 111 to 184 lines and introduced `useId`. The previous
settings-specific `FormField` component was replaced with a reusable
`components/ui/FormField.tsx` component supporting labels, hints, errors,
required fields, and React children.

Validation was also made more explicit. Instead of relying mainly on one
generic field-validation function, the implementation introduced separate
validators such as `validateDisplayName`, `validateEmail`, `validateBio`,
`validateDefaultModel`, and `validateTemperature`. AI model options were
also represented as a typed constant with an `AIModel` type.

Round 2 also added `scripts/test-validation.mts`, containing automated
validation checks for the settings form.

The implementation was saved on the `round-2-precise` branch.

## Comparison

| Area | Round 1 — Vague | Round 2 — Precise |
|---|---|---|
| Structure | Simpler implementation with a settings-specific FormField | More reusable UI component and more structured form logic |
| Validation | Generic field validation approach | Separate validators for individual fields plus form-level validation |
| Accessibility | Required more manual review | Added reusable field semantics and `useId` for stable field relationships |
| Type safety | Basic string-based model configuration | Typed AI model options and an `AIModel` type |
| Verification | Mainly manual browser, lint, and build checks | Added automated validation cases plus lint and production build verification |
| Review effort | More manual inspection was needed because requirements were implicit | More structured requirements and automated checks made verification more systematic |

## AI Mistake Caught

The precise workflow demonstrated why AI-generated code still needs
verification. The generated validation test script initially imported a
TypeScript file using a `.ts` extension.

Running `npm run build` failed with TypeScript error TS5097 because the
project was not configured to allow TypeScript extensions in import paths.

I identified the problem from the build output, corrected the import, and ran
the production build again. The build then completed successfully.

I also noticed that the precise round changed the application metadata from
`"FlyRank AI Capstone"` to `"Create Next App"`. This was an unintended
regression from the generated changes and reinforced the need to review
changes beyond whether the feature itself works.

## What I Learned

The main difference was not simply that the second AI output contained more
code. The precise workflow made the requirements, constraints, and
verification process explicit before implementation.

The vague approach was faster to start, but it increased review effort
because important decisions were implicit. The precise approach required more
planning, but produced a more structured and testable implementation.

The experiment also showed that a detailed prompt does not eliminate AI
mistakes. The second round still introduced a TypeScript import error and an
unintended metadata change. These issues were discovered because the output
was reviewed and verified rather than accepted automatically.

Going forward, my AI development workflow will include project context,
relevant files, explicit requirements, constraints, edge cases, and a
verification step. I will treat AI output as a draft that must be reviewed,
tested, and verified rather than as automatically correct code.