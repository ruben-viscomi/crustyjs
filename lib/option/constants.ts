export const OPTION_NONE = "NONE";
export const OPTION_SOME = "SOME";
export const OPTION_TYPES = [OPTION_NONE, OPTION_SOME] as const;

export const OPTION_FIELD_DISCRIMINATOR = "_optionType";
export const SOME_FIELD_VALUE = "_value";