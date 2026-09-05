export const AI_MODEL_OPTIONS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
] as const;

export type AIModel = (typeof AI_MODEL_OPTIONS)[number]["value"];

export interface SettingsFormData {
  displayName: string;
  email: string;
  bio: string;
  defaultModel: AIModel | "";
  temperature: string;
  emailNotifications: boolean;
}

export type SettingsFormField = keyof SettingsFormErrors;

export interface SettingsFormErrors {
  displayName?: string;
  email?: string;
  bio?: string;
  defaultModel?: string;
  temperature?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_MODEL_VALUES = new Set<string>(
  AI_MODEL_OPTIONS.map((option) => option.value),
);

export function validateDisplayName(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Display name is required.";
  }

  if (trimmed.length < 2) {
    return "Display name must be at least 2 characters.";
  }

  if (trimmed.length > 50) {
    return "Display name must be 50 characters or fewer.";
  }

  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address.";
  }

  return undefined;
}

export function validateBio(value: string): string | undefined {
  if (value.length > 200) {
    return "Bio must be 200 characters or fewer.";
  }

  return undefined;
}

export function validateDefaultModel(value: string): string | undefined {
  if (!value) {
    return "Select a default AI model.";
  }

  if (!VALID_MODEL_VALUES.has(value)) {
    return "Select a valid AI model.";
  }

  return undefined;
}

export function validateTemperature(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Temperature is required.";
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed)) {
    return "Temperature must be a number.";
  }

  if (parsed < 0 || parsed > 2) {
    return "Temperature must be between 0 and 2.";
  }

  return undefined;
}

export function validateField(
  field: SettingsFormField,
  data: SettingsFormData,
): string | undefined {
  switch (field) {
    case "displayName":
      return validateDisplayName(data.displayName);
    case "email":
      return validateEmail(data.email);
    case "bio":
      return validateBio(data.bio);
    case "defaultModel":
      return validateDefaultModel(data.defaultModel);
    case "temperature":
      return validateTemperature(data.temperature);
    default:
      return undefined;
  }
}

export function validateSettingsForm(
  data: SettingsFormData,
): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  const displayNameError = validateDisplayName(data.displayName);
  if (displayNameError) {
    errors.displayName = displayNameError;
  }

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  const bioError = validateBio(data.bio);
  if (bioError) {
    errors.bio = bioError;
  }

  const defaultModelError = validateDefaultModel(data.defaultModel);
  if (defaultModelError) {
    errors.defaultModel = defaultModelError;
  }

  const temperatureError = validateTemperature(data.temperature);
  if (temperatureError) {
    errors.temperature = temperatureError;
  }

  return errors;
}

export function hasValidationErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const DEFAULT_SETTINGS_FORM_DATA: SettingsFormData = {
  displayName: "",
  email: "",
  bio: "",
  defaultModel: "",
  temperature: "",
  emailNotifications: true,
};
