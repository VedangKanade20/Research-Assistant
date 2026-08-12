import { createRequire } from 'module';
import { BadRequestError } from './errors.js';

const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse');

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
      let extractedText = '';

      // Check if installed pdf-parse version uses functional export (v1.x) or class export (v2.x)
      if (typeof pdfParseModule === 'function') {
        const parsed = await pdfParseModule(buffer);
        extractedText = parsed.text;
      } else if (pdfParseModule.PDFParse) {
        const parser = new pdfParseModule.PDFParse({ data: buffer });
        const res = await parser.getText();
        extractedText = res.text || res;
      } else {
        throw new Error('Unrecognized pdf-parse export module format');
      }

      if (extractedText && extractedText.trim().length > 0) {
        return extractedText;
      }

      // Fallback for unstructured PDF streams without font maps
      const rawString = buffer.toString('binary');
      const textMatch = rawString.match(/\((.*?)\)/g);
      if (textMatch && textMatch.length > 0) {
        return textMatch.map(t => t.slice(1, -1)).join(' ');
      }

      throw new Error('PDF file contains no extractable text layer');
    } catch (err) {
      console.error('PDF Parsing Error Detail:', err);
      throw new BadRequestError(`Failed to parse PDF document content: ${err.message}`);
    }
  }

  throw new BadRequestError('Unsupported file type. Only PDF and TXT files are supported.');
}
