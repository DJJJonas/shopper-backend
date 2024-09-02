import { ValidGeminiMimeType } from '../constants';

// Thank you wikipedia: https://en.wikipedia.org/wiki/List_of_file_signatures
export default function checkBufferMimeType(
  buffer: Buffer,
): ValidGeminiMimeType | null {
  if (
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  )
    return 'image/png';

  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])))
    return 'image/jpeg';

  if (
    buffer.subarray(0, 4).equals(Buffer.from([0x52, 0x49, 0x46, 0x46])) &&
    buffer.subarray(8, 12).toString() === 'WEBP'
  )
    return 'image/webp';
  // both HEIC and HEIF use the same magic number
  if (buffer.subarray(4, 12).equals(Buffer.from([0x66, 0x74, 0x79, 0x70])))
    return 'image/heic';

  return null;
}
