export const RESULT_ERR = "ERR";
export const RESULT_OK = "OK";
export const RESULT_TYPES = [RESULT_ERR, RESULT_OK] as const;

export const RESULT_FIELD_DISCRIMINATOR = "_resultType";
export const OK_FIELD_VALUE = "_value";
export const ERR_FIELD_VALUE = "_error";