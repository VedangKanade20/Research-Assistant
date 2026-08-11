import { createRequire } from 'module';
import { BadRequestError } from './errors.js';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Extracts plain text from a Buffer (PDF or TXT)
 * @param {Buffer} buffer 
 * @param {string} mimeType 
 * @returns {Promise<string>}
 */
export async function extractTextFromBuffer(buffer, mimeType) {
  if (mimeType === 'text/plain') {
    return buffer.toString('utf-8');
  }

  if (mimeType === 'application/pdf') {
    try {
      const parsed = await pdfParse(buffer);
      return parsed.text;
    } catch (err) {
      throw new BadRequestError('Failed to parse PDF document content.');
    }
  }

  throw new BadRequestError('Unsupported file type. Only PDF and TXT files are supported.');
}
