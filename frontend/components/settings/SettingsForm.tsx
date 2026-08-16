"use client";

import { FormEvent, useId, useState } from "react";
import {
  FormField,
  getFieldDescribedBy,
  inputClassName,
  inputErrorClassName,
} from "@/components/ui/FormField";
import {
  AI_MODEL_OPTIONS,
  DEFAULT_SETTINGS_FORM_DATA,
  hasValidationErrors,
  type SettingsFormData,
  type SettingsFormErrors,
  type SettingsFormField,
  validateField,
  validateSettingsForm,
} from "@/lib/validation/settings";

const SAVE_DELAY_MS = 800;

const VALIDATED_FIELDS: SettingsFormField[] = [
  "displayName",
  "email",
  "bio",
  "defaultModel",
  "temperature",
];

function simulateSave(data: SettingsFormData): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.info("Settings saved:", data);
      resolve();
    }, SAVE_DELAY_MS);
  });
}

export function SettingsForm() {
  const formTitleId = useId();
  const successMessageId = useId();
  const submitErrorId = useId();

  const [formData, setFormData] = useState<SettingsFormData>(
    DEFAULT_SETTINGS_FORM_DATA,
  );
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<SettingsFormField, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function updateField<K extends keyof SettingsFormData>(
    field: K,
    value: SettingsFormData[K],
  ) {
    setFormData((current) => {
      const nextData = { ...current, [field]: value };

      if (touched[field as SettingsFormField] || submitAttempted) {
        const fieldError = validateField(
          field as SettingsFormField,
          nextData,
        );

        setErrors((currentErrors) => {
          const next = { ...currentErrors };
          if (fieldError) {
            next[field as SettingsFormField] = fieldError;
          } else {
            delete next[field as SettingsFormField];
          }
          return next;
        });
      }

      return nextData;
    });
    setSuccessMessage("");
  }

  function handleBlur(field: SettingsFormField) {
    setTouched((current) => ({ ...current, [field]: true }));

    const fieldError = validateField(field, formData);
    setErrors((current) => {
      const next = { ...current };
      if (fieldError) {
        next[field] = fieldError;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    setSuccessMessage("");

    const validationErrors = validateSettingsForm(formData);
    setErrors(validationErrors);
    setTouched(
      VALIDATED_FIELDS.reduce(
        (accumulator, field) => ({ ...accumulator, [field]: true }),
        {} as Partial<Record<SettingsFormField, boolean>>,
      ),
    );

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: SettingsFormData = {
        ...formData,
        displayName: formData.displayName.trim(),
        email: formData.email.trim(),
      };

      await simulateSave(payload);
      setSuccessMessage("Your settings were saved successfully.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const bioHint = `${formData.bio.length}/200 characters`;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={formTitleId}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-1">
        <h1
          id={formTitleId}
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Settings
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Manage your profile details and AI preferences.
        </p>
      </div>

      {successMessage ? (
        <div
          id={successMessageId}
          role="status"
          aria-live="polite"
          className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
        >
          {successMessage}
        </div>
      ) : null}

      <section
        aria-labelledby={`${formTitleId}-profile`}
        className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
      >
        <h2
          id={`${formTitleId}-profile`}
          className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
        >
          Profile
        </h2>

        <FormField
          id="displayName"
          label="Display name"
          required
          error={errors.displayName}
        >
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="name"
            value={formData.displayName}
            onChange={(event) => updateField("displayName", event.target.value)}
            onBlur={() => handleBlur("displayName")}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={getFieldDescribedBy(
              "displayName",
              undefined,
              errors.displayName,
            )}
            className={`${inputClassName} ${errors.displayName ? inputErrorClassName : ""}`}
          />
        </FormField>

        <FormField id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={getFieldDescribedBy(
              "email",
              undefined,
              errors.email,
            )}
            className={`${inputClassName} ${errors.email ? inputErrorClassName : ""}`}
          />
        </FormField>

        <FormField
          id="bio"
          label="Bio"
          hint={bioHint}
          error={errors.bio}
        >
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            onBlur={() => handleBlur("bio")}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={getFieldDescribedBy("bio", bioHint, errors.bio)}
            className={`${inputClassName} resize-y min-h-24 ${errors.bio ? inputErrorClassName : ""}`}
          />
        </FormField>
      </section>

      <section
        aria-labelledby={`${formTitleId}-ai`}
        className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
      >
        <h2
          id={`${formTitleId}-ai`}
          className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
        >
          AI preferences
        </h2>

        <FormField
          id="defaultModel"
          label="Default AI model"
          required
          error={errors.defaultModel}
        >
          <select
            id="defaultModel"
            name="defaultModel"
            value={formData.defaultModel}
            onChange={(event) =>
              updateField("defaultModel", event.target.value as SettingsFormData["defaultModel"])
            }
            onBlur={() => handleBlur("defaultModel")}
            aria-invalid={Boolean(errors.defaultModel)}
            aria-describedby={getFieldDescribedBy(
              "defaultModel",
              undefined,
              errors.defaultModel,
            )}
            className={`${inputClassName} ${errors.defaultModel ? inputErrorClassName : ""}`}
          >
            <option value="">Select a model</option>
            {AI_MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="temperature"
          label="Temperature"
          required
          error={errors.temperature}
          hint="Controls randomness. Use 0 for focused output and 2 for more creative output."
        >
          <input
            id="temperature"
            name="temperature"
            type="number"
            min={0}
            max={2}
            step={0.1}
            inputMode="decimal"
            value={formData.temperature}
            onChange={(event) => updateField("temperature", event.target.value)}
            onBlur={() => handleBlur("temperature")}
            aria-invalid={Boolean(errors.temperature)}
            aria-describedby={getFieldDescribedBy(
              "temperature",
              "Controls randomness. Use 0 for focused output and 2 for more creative output.",
              errors.temperature,
            )}
            className={`${inputClassName} ${errors.temperature ? inputErrorClassName : ""}`}
          />
        </FormField>

        <div className="flex items-start gap-3">
          <input
            id="emailNotifications"
            name="emailNotifications"
            type="checkbox"
            checked={formData.emailNotifications}
            onChange={(event) =>
              updateField("emailNotifications", event.target.checked)
            }
            aria-describedby="emailNotifications-hint"
            className="mt-1 size-4 rounded border-zinc-300 text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-950 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
          />
          <div className="flex flex-col gap-1">
            <label
              htmlFor="emailNotifications"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Email notifications
            </label>
            <p
              id="emailNotifications-hint"
              className="text-sm text-zinc-500 dark:text-zinc-400"
            >
              Receive email updates about your account activity.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-describedby={submitAttempted && hasValidationErrors(errors) ? submitErrorId : undefined}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
        >
          {isSubmitting ? "Saving..." : "Save settings"}
        </button>

        {submitAttempted && hasValidationErrors(errors) ? (
          <p
            id={submitErrorId}
            role="alert"
            aria-live="assertive"
            className="text-sm text-red-600 dark:text-red-400"
          >
            Please fix the highlighted errors before saving.
          </p>
        ) : null}
      </div>
    </form>
  );
}
