export const GENDER_MAPPING = {
  0: 'Not set / not specified',
  1: 'Female',
  2: 'Male',
  3: 'Non-binary',
} as const

export type GenderKey = keyof typeof GENDER_MAPPING
export type GenderValue = (typeof GENDER_MAPPING)[GenderKey]
