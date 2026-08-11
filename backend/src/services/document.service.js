import { DocumentRepository } from '../repositories/document.repository.js';
import { extractTextFromBuffer } from '../utils/textExtractor.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export class DocumentService {
  constructor() {
    this.documentRepository = new DocumentRepository();
  }

  async getUserDocuments(userId) {
    return await this.documentRepository.findByUserId(userId);
  }

  async getDocumentById(id, userId) {
    const doc = await this.documentRepository.findById(id, userId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return doc;
  }

  async processAndSaveUpload({ userId, fileBuffer, filename, mimeType }) {
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new BadRequestError('Uploaded file is empty');
    }

    const fileType = mimeType === 'application/pdf' ? 'pdf' : 'txt';
    const extractedText = await extractTextFromBuffer(fileBuffer, mimeType);

    if (!extractedText || extractedText.trim().length === 0) {
      throw new BadRequestError('Could not extract readable text content from file');
    }

    const newDoc = await this.documentRepository.create({
      userId,
      filename,
      fileType,
      originalSize: fileBuffer.length,
      extractedText,
      summary: null
    });

    return newDoc;
  }

  async deleteDocument(id, userId) {
    const deleted = await this.documentRepository.deleteById(id, userId);
    if (!deleted) {
      throw new NotFoundError('Document not found or access denied');
    }
    return deleted;
  }
}
