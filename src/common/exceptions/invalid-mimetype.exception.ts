import { VALID_GEMINI_MIME } from '../constants';

export class InvalidMimeTypeException extends Error {
  constructor() {
    super(
      `the image must me one of the following types: ${VALID_GEMINI_MIME.map((mime) => mime.replace('image/', '')).join(', ')}`,
    );
  }
}
