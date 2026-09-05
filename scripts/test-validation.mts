import {
  validateBio,
  validateDefaultModel,
  validateDisplayName,
  validateEmail,
  validateSettingsForm,
  validateTemperature,
  DEFAULT_SETTINGS_FORM_DATA,
  hasValidationErrors,
} from "../lib/validation/settings";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function testDisplayNameValidation() {
  assert(validateDisplayName("") === "Display name is required.", "empty name");
  assert(
    validateDisplayName("   ") === "Display name is required.",
    "whitespace-only name",
  );
  assert(
    validateDisplayName("A") === "Display name must be at least 2 characters.",
    "short name",
  );
  assert(
    validateDisplayName("A".repeat(51)) ===
      "Display name must be 50 characters or fewer.",
    "long name",
  );
  assert(validateDisplayName("  Anu  ") === undefined, "valid trimmed name");
}

function testEmailValidation() {
  assert(validateEmail("") === "Email is required.", "empty email");
  assert(validateEmail("not-an-email") === "Enter a valid email address.", "invalid email");
  assert(validateEmail("user@example.com") === undefined, "valid email");
}

function testBioValidation() {
  assert(validateBio("A".repeat(201)) !== undefined, "bio too long");
  assert(validateBio("") === undefined, "empty bio allowed");
}

function testModelValidation() {
  assert(validateDefaultModel("") !== undefined, "missing model");
  assert(validateDefaultModel("invalid") !== undefined, "invalid model");
  assert(validateDefaultModel("gpt-4o") === undefined, "valid model");
}

function testTemperatureValidation() {
  assert(validateTemperature("") !== undefined, "empty temperature");
  assert(validateTemperature("abc") !== undefined, "non-numeric temperature");
  assert(validateTemperature("-0.1") !== undefined, "temperature below 0");
  assert(validateTemperature("2.1") !== undefined, "temperature above 2");
  assert(validateTemperature("1.5") === undefined, "valid temperature");
}

function testFormValidation() {
  const invalid = validateSettingsForm(DEFAULT_SETTINGS_FORM_DATA);
  assert(hasValidationErrors(invalid), "empty form should fail");

  const valid = validateSettingsForm({
    displayName: "Anuradha",
    email: "user@example.com",
    bio: "Engineer",
    defaultModel: "gpt-4o-mini",
    temperature: "0.7",
    emailNotifications: true,
  });
  assert(!hasValidationErrors(valid), "valid form should pass");
}

testDisplayNameValidation();
testEmailValidation();
testBioValidation();
testModelValidation();
testTemperatureValidation();
testFormValidation();

console.log("All validation tests passed.");
