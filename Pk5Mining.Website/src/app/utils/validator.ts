import { parsePhoneNumberFromString } from "libphonenumber-js";
import { ApplicationErrors, IApplicantBioData } from "../interfaces";
import { countryToIso, normalizeLinkedInUrl } from "./helper";

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPhone = (phone: string) => phone.trim().length >= 7;

export const isValidName = (name: string) => {
  const trimmed = name.trim();

  if (trimmed.length < 2) return false;

  // Letters, spaces, hyphen, apostrophe only
  const nameRegex = /^[A-Za-z\s'-]+$/;

  return nameRegex.test(trimmed);
};

export const isValidLinkedIn = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return true;
  try {
    const parsed = new URL(normalizeLinkedInUrl(trimmed));
    const host = parsed.hostname.replace(/^www\./, "");
    return host === "linkedin.com" || host.endsWith(".linkedin.com");
  } catch {
    return false;
  }
};

export const isValidPhoneForCountry = (phone: string, country: string) => {
  const trimmed = phone.trim();
  if (!trimmed) return false;

  const iso = countryToIso[country];
  if (!iso) {
    // "Other" or unknown country: basic fallback
    const digits = trimmed.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  const parsed = parsePhoneNumberFromString(trimmed, iso);
  return !!parsed && parsed.isValid();
};

export const validateApplication = (
  data: IApplicantBioData,
  resumeFile: File | null,
): ApplicationErrors => {
  const errors: ApplicationErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!isValidName(data.firstName)) {
    errors.firstName =
      "First name must be at least 2 letters and contain only alphabets.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!isValidName(data.lastName)) {
    errors.lastName =
      "Last name must be at least 2 letters and contain only alphabets.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.country.trim()) {
    errors.country = "Please select a country.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhoneForCountry(data.phone, data.country)) {
    errors.phone = "Please enter a valid phone number for the selected country.";
  }

  if (!resumeFile) {
    errors.resume = "Please upload your resume.";
  } else if (resumeFile.type !== "application/pdf") {
    errors.resume = "Resume must be a PDF file.";
  }

  // LinkedIn optional
  if (data.linkedinUrl && !isValidLinkedIn(data.linkedinUrl)) {
    errors.linkedinUrl =
      "Please provide a valid LinkedIn profile URL (linkedin.com).";
  }

  return errors;
};

