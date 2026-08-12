import { ChatRepository } from '../repositories/chat.repository.js';
import { DocumentRepository } from '../repositories/document.repository.js';
import { GeminiService } from './gemini.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export class RagService {
  constructor() {
    this.chatRepository = new ChatRepository();
    this.documentRepository = new DocumentRepository();
    this.geminiService = new GeminiService();
  }

  async getChatHistory(documentId, userId) {
    // Verify document ownership
    const doc = await this.documentRepository.findById(documentId, userId);
    if (!doc) throw new NotFoundError('Document not found');

    const session = await this.chatRepository.getOrCreateSession(documentId, userId);
    const messages = await this.chatRepository.getSessionMessages(session.id);

    return {
      session,
      messages
    };
  }

  async askQuestion({ documentId, userId, question }) {
    if (!question || question.trim().length === 0) {
      throw new BadRequestError('Question cannot be empty');
    }

    // 1. Verify Document Access
    const doc = await this.documentRepository.findById(documentId, userId);
    if (!doc) throw new NotFoundError('Document not found');

    // 2. Get or Create Session
    const session = await this.chatRepository.getOrCreateSession(documentId, userId);

    // 3. Save User Question to Chat History
    await this.chatRepository.addMessage({
      sessionId: session.id,
      role: 'user',
      content: question.trim(),
      tokensUsed: 0
    });

    // 4. Generate Question Query Embedding
    const queryEmbeddings = await this.geminiService.generateEmbeddings([question.trim()]);
    const queryVector = queryEmbeddings[0] || new Array(768).fill(0);

    // 5. Vector Cosine Similarity Search in Postgres (Top 5 Chunks for Rich Context)
    const topChunks = await this.chatRepository.findTopKChunks(documentId, userId, queryVector, 5);
    const contextTexts = topChunks.map(c => c.content);

    // 6. Generate Grounded Answer via Gemini 3.6
    const { answer, tokensUsed } = await this.geminiService.generateGroundedAnswer(question.trim(), contextTexts);

    // 7. Save Assistant Answer to Chat History
    const assistantMsg = await this.chatRepository.addMessage({
      sessionId: session.id,
      role: 'assistant',
      content: answer,
      tokensUsed
    });

    return {
      sessionId: session.id,
      message: assistantMsg,
      sources: topChunks.map(c => ({ chunkIndex: c.chunkIndex, content: c.content }))
    };
  }
}
