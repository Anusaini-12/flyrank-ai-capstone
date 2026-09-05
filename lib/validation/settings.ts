export type SettingsFormData = {
  displayName: string;
  email: string;
  bio: string;
  defaultModel: string;
  temperature: string;
  emailNotifications: boolean;
};

export type SettingsFormErrors = Partial<Record<keyof SettingsFormData, string>>;

export const DEFAULT_SETTINGS: SettingsFormData = {
  displayName: "",
  email: "",
  bio: "",
  defaultModel: "gpt-4o-mini",
  temperature: "0.7",
  emailNotifications: true,
};

export const MODEL_OPTIONS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettingsField(
  field: keyof SettingsFormData,
  value: SettingsFormData[keyof SettingsFormData],
): string | undefined {
  switch (field) {
    case "displayName": {
      const name = String(value).trim();
      if (!name) return "Display name is required.";
      if (name.length < 2) return "Display name must be at least 2 characters.";
      if (name.length > 50) return "Display name must be 50 characters or fewer.";
      return undefined;
    }
    case "email": {
      const email = String(value).trim();
      if (!email) return "Email is required.";
      if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
      return undefined;
    }
    case "bio": {
      const bio = String(value);
      if (bio.length > 200) return "Bio must be 200 characters or fewer.";
      return undefined;
    }
    case "defaultModel": {
      const model = String(value);
      if (!model) return "Select a default model.";
      if (!MODEL_OPTIONS.some((option) => option.value === model)) {
        return "Select a valid model.";
      }
      return undefined;
    }
    case "temperature": {
      const raw = String(value).trim();
      if (!raw) return "Temperature is required.";
      const temperature = Number(raw);
      if (Number.isNaN(temperature)) return "Temperature must be a number.";
      if (temperature < 0 || temperature > 2) {
        return "Temperature must be between 0 and 2.";
      }
      return undefined;
    }
    case "emailNotifications":
      return undefined;
    default:
      return undefined;
  }
}

export function validateSettingsForm(data: SettingsFormData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  (Object.keys(data) as Array<keyof SettingsFormData>).forEach((field) => {
    const error = validateSettingsField(field, data[field]);
    if (error) errors[field] = error;
  });

  return errors;
}
