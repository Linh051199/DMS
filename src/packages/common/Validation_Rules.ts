const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const regexNumber =
  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
const stringType = /[a-zA-Z0-9]/;
const onlyNumberType = /[0-9]/;

// I need to exclude special characters
const excludeSpecialCharacters = /^[a-zA-Z0-9]+$/;

export const requiredStringType = {
  type: "pattern",
  pattern: stringType,
};

export const requiredType = {
  type: "required",
};

export const RequiredField = (message: string) => {
  return {
    type: "required",
    message,
  };
};

export const regexLatType = {
  type: "pattern",
  pattern: regexLat,
};

export const numberType = {
  type: "pattern",
  pattern: regexNumber,
};

export const regexLonType = {
  type: "pattern",
  pattern: regexLon,
};

export const ExcludeSpecialCharactersType = {
  type: "pattern",
  pattern: excludeSpecialCharacters,
};

export const requiredRangeNumber = {
  type: "range",
  min: 0,
  max: 100000000000,
};
export const requiredOnlyNumber = {
  type: "pattern",
  pattern: onlyNumberType,
};
export default {
  requiredStringType,
  requiredType,
  RequiredField,
  regexLatType,
  numberType,
  regexLonType,
  ExcludeSpecialCharactersType,
  requiredRangeNumber,
  requiredOnlyNumber,
};
