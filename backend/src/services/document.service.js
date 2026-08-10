import { DocumentRepository } from '../repositories/document.repository.js';

export class DocumentService {
  constructor() {
    this.documentRepository = new DocumentRepository();
  }

  async getUserDocuments(userId) {
    return await this.documentRepository.findByUserId(userId);
  }

  async createDocument({ userId, filename, originalSize, summary = null }) {
    return await this.documentRepository.create({
      userId,
      filename,
      originalSize,
      summary
    });
  }
}
