const OPTION_NONE = "NONE";
const OPTION_SOME = "SOME";
const OPTION_TYPES = [OPTION_NONE, OPTION_SOME] as const;

const OPTION_FIELD_DISCRIMINATOR = "_optionType";
const SOME_FIELD_VALUE = "_value";