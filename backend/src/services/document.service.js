import { DocumentRepository } from '../repositories/document.repository.js';
import { ChunkRepository } from '../repositories/chunk.repository.js';
import { GeminiService } from './gemini.service.js';
import { extractTextFromBuffer } from '../utils/textExtractor.js';
import { chunkText } from '../utils/chunker.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export class DocumentService {
  constructor() {
    this.documentRepository = new DocumentRepository();
    this.chunkRepository = new ChunkRepository();
    this.geminiService = new GeminiService();
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

    // 1. Generate Executive Summary via Gemini API
    const summary = await this.geminiService.generateSummary(extractedText);

    // 2. Save Document record to Postgres
    const newDoc = await this.documentRepository.create({
      userId,
      filename,
      fileType,
      originalSize: fileBuffer.length,
      extractedText,
      summary
    });

    // 3. Chunk Document Text
    const rawChunks = chunkText(extractedText);

    if (rawChunks.length > 0) {
      // 4. Generate 768-dim embeddings via Gemini API
      const chunkTexts = rawChunks.map(c => c.content);
      const embeddings = await this.geminiService.generateEmbeddings(chunkTexts);

      // 5. Build Chunk Batch for DB
      const chunksData = rawChunks.map((c, i) => ({
        documentId: newDoc.id,
        userId,
        chunkIndex: c.chunkIndex,
        content: c.content,
        embedding: embeddings[i] || new Array(768).fill(0)
      }));

      // 6. Bulk Insert Chunks into Postgres
      await this.chunkRepository.insertBatch(chunksData);
    }

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
