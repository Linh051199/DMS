import { ValidationRule } from "devextreme-react/common";

const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const regexNumber =
  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
const stringType = /[a-zA-Z0-9]/;
const onlyNumberType = /[0-9]/;

// I need to exclude special characters
const excludeSpecialCharacters = /^[a-zA-Z0-9]+$/;
const excludeSpecialCharactersAllowSpace = /^[a-zA-Z0-9\s]+$/;
const excludeSpecialCharactersOnlyNumbers = /^[0-9]+$/;
const vietnameseCharacter = /^[a-zA-Z0-9À-ỹ\s]+$/;
// /^[a-zA-Z0-9ÀÁẢẠẦẤẨẬẪÃĂẰẮẲẴẶÂâầấẩẫậãẵắẳẫặêếềễểệÊÈÉËẼẺẸèéëẽẻẹịìíĩỉIỈĨỊÌọộồốổỗÔỒỐỔỘỖổỗơờớởỡợƠỜỚỞỠỢƯỪỨỬỮỰƯựừứửữƠỚỜỞỠỢẦẤẨẪẬỂỀẾỄỆôồốổỗộổÔỒỐỔỘỖổỗơờớởỡợƠỜỚỞỠỢàáảãạăắằẳẵặÂẤẦẨẪẬẨẨĂẮẰẲẴẶĂđĐÔỒỐỔỖỘơờớởỡợƠỜỚỞỠỢƠếềểễệÈÉẼẺẸËêềếểễệỀÊỂỄỆùúủũụưừứửữựƯỨỪỬỮỰÙÚỦŨỤỲÝỶỸỴỲỴỶỸƳỴỶỸỲỲýỹỷỵýùúủũụưừứửữựƯỨỪỬỮỰÙÚỦŨỤỲÝỶỸỴỲỴỶỸỲỲ\s]+$/;

const vietnameseCharacterExcludeSpecialCharacter = /^[\p{L}\p{N} ]+$/;

export const RequiredVietNameeseExcludeSpecialCharacters = {
  type: "pattern",
  pattern: vietnameseCharacter,
};
export const RequiredVietNameeseExcludeSpecialCharacters2 = {
  type: "pattern",
  pattern: vietnameseCharacterExcludeSpecialCharacter,
};

export const requiredStringType = {
  type: "pattern",
  pattern: stringType,
} as ValidationRule;

export const requiredType = {
  type: "required",
};

export const RequiredField = (message: string): ValidationRule => {
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

export const ExcludeSpecialCharactersAllowSpaceType = {
  type: "pattern",
  pattern: excludeSpecialCharactersAllowSpace,
};

export const requiredRangeNumber = {
  type: "range",
  min: 0,
  max: 100000000000,
};
export const requiredRangePercent = {
  type: "range",
  min: 0,
  max: 100,
};
export const requiredOnlyNumber = {
  type: "pattern",
  pattern: onlyNumberType,
};
export const requiredExcludeSpecialCharactersOnlyNumbers = {
  type: "pattern",
  pattern: excludeSpecialCharactersOnlyNumbers,
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
