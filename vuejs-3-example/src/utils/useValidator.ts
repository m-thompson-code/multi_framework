import { iValidationsNumber, iValidationsString } from "../models/forms-validation.model";

export const useValidator = ({
  value = "",
  type,
  validations = {}
}: {
  value: string | number;
  type: "text" | "email" | "number";
  validations?: iValidationsString | iValidationsNumber;
}): { errors: string[] } => {
  const { min, max, required } = validations;
  const { regex } = validations as iValidationsString;
  const { wholeNumber } = validations as iValidationsNumber;

  const emailRegex = regex ? regex.value : /^\S+@\S+\.\S+$/;

  const errors: string[] = [];
  const strValue = String(value);
  const numValue = Number(value);

  switch (type) {
    case "text":
      if (required && required.value === true && strValue.length === 0) {
        errors.push(required.message || "Input is required");
      }

      if (min && strValue.length < min.value) {
        errors.push(min.message || `Input length needs to be at least ${min.value}`);
      }

      if (max && strValue.length > max.value) {
        errors.push(max.message || `Input length needs to be less than ${max.value}`);
      }

      if (regex && regex.value.test(strValue) === false) {
        errors.push(regex.message || "Input does not meet the format requirements");
      }

      return { errors };

    case "email":
      if (emailRegex.test(strValue) === false) {
        errors.push(regex && regex.message ? regex.message : "Input requires a valid email address");
      }

      return { errors };

    case "number":
      if (Number.isNaN(numValue)) {
        errors.push("Input needs to be a numeric value");
      } else {
        if (wholeNumber && wholeNumber.value === true && !Number.isInteger(numValue)) {
          errors.push(wholeNumber.message || "Input needs to be a whole number");
        }

        if (min && numValue < min.value) {
          errors.push(min.message || `Input needs to be at least ${min.value}`);
        }

        if (max && numValue > max.value) {
          errors.push(max.message || `Input needs to be less than ${max.value}`);
        }
      }

      return { errors };
    default:
      [];
  }
  return { errors: [] };
};
