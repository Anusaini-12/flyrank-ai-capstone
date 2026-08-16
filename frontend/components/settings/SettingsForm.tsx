"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FormField } from "@/components/settings/FormField";
import {
  DEFAULT_SETTINGS,
  MODEL_OPTIONS,
  validateSettingsField,
  validateSettingsForm,
  type SettingsFormData,
  type SettingsFormErrors,
} from "@/lib/validation/settings";

const inputClassName =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/10 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100/10";

const validInputClassName =
  "border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600";

const invalidInputClassName =
  "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-400 dark:focus:border-red-400";

function getInputClassName(hasError: boolean) {
  return `${inputClassName} ${hasError ? invalidInputClassName : validInputClassName}`;
}

export function SettingsForm() {
  const [formData, setFormData] = useState<SettingsFormData>(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SettingsFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  function updateField<K extends keyof SettingsFormData>(
    field: K,
    value: SettingsFormData[K],
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
    setSubmitMessage(null);

    if (touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateSettingsField(field, value),
      }));
    }
  }

  function handleBlur(field: keyof SettingsFormData) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: validateSettingsField(field, formData[field]),
    }));
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = event.target;
    const field = name as keyof SettingsFormData;

    if (type === "checkbox") {
      updateField(field, (event.target as HTMLInputElement).checked as SettingsFormData[typeof field]);
      return;
    }

    updateField(field, value as SettingsFormData[typeof field]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage(null);

    const nextErrors = validateSettingsForm(formData);
    setErrors(nextErrors);
    setTouched({
      displayName: true,
      email: true,
      bio: true,
      defaultModel: true,
      temperature: true,
      emailNotifications: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitMessage("Settings saved successfully.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-6"
    >
      <div className="grid gap-6">
        <FormField
          id="displayName"
          label="Display name"
          error={touched.displayName ? errors.displayName : undefined}
        >
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="name"
            value={formData.displayName}
            onChange={handleChange}
            onBlur={() => handleBlur("displayName")}
            aria-invalid={Boolean(touched.displayName && errors.displayName)}
            className={getInputClassName(Boolean(touched.displayName && errors.displayName))}
            placeholder="Anuradha"
          />
        </FormField>

        <FormField
          id="email"
          label="Email"
          error={touched.email ? errors.email : undefined}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(touched.email && errors.email)}
            className={getInputClassName(Boolean(touched.email && errors.email))}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField
          id="bio"
          label="Bio"
          hint={`${formData.bio.length}/200 characters`}
          error={touched.bio ? errors.bio : undefined}
        >
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            onBlur={() => handleBlur("bio")}
            aria-invalid={Boolean(touched.bio && errors.bio)}
            className={`${getInputClassName(Boolean(touched.bio && errors.bio))} resize-y`}
            placeholder="Tell us a little about yourself."
          />
        </FormField>

        <FormField
          id="defaultModel"
          label="Default AI model"
          error={touched.defaultModel ? errors.defaultModel : undefined}
        >
          <select
            id="defaultModel"
            name="defaultModel"
            value={formData.defaultModel}
            onChange={handleChange}
            onBlur={() => handleBlur("defaultModel")}
            aria-invalid={Boolean(touched.defaultModel && errors.defaultModel)}
            className={getInputClassName(Boolean(touched.defaultModel && errors.defaultModel))}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="temperature"
          label="Temperature"
          hint="Lower values are more focused. Higher values are more creative."
          error={touched.temperature ? errors.temperature : undefined}
        >
          <input
            id="temperature"
            name="temperature"
            type="number"
            min={0}
            max={2}
            step={0.1}
            value={formData.temperature}
            onChange={handleChange}
            onBlur={() => handleBlur("temperature")}
            aria-invalid={Boolean(touched.temperature && errors.temperature)}
            className={getInputClassName(Boolean(touched.temperature && errors.temperature))}
          />
        </FormField>

        <div className="flex items-start gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <input
            id="emailNotifications"
            name="emailNotifications"
            type="checkbox"
            checked={formData.emailNotifications}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <div className="flex flex-col gap-1">
            <label
              htmlFor="emailNotifications"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Email notifications
            </label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Receive updates about AI usage and account activity.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isSubmitting ? "Saving..." : "Save settings"}
        </button>

        {submitMessage ? (
          <p
            role="status"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            {submitMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
