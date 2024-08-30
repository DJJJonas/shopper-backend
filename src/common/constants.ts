export const PATH_DELIMITER = '/'; // If OS is Windows, use '\\'
export const MEASURE_REPOSITORY = 'MEASURE_REPOSITORY';
export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';
export const MEASURE_TYPES = ['WATER', 'GAS'] as const;
export type MeasureType = (typeof MEASURE_TYPES)[number];

export const VALID_GEMINI_MIME = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/heic',
  'image/heif',
] as const;
export type ValidGeminiMimeType = (typeof VALID_GEMINI_MIME)[number];
