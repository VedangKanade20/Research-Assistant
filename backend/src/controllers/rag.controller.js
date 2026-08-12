import { RagService } from '../services/rag.service.js';

const ragService = new RagService();

export async function askQuestionHandler(request, reply) {
  const userId = request.user.sub;
  const { id: documentId } = request.params;
  const { question } = request.body || {};

  const result = await ragService.askQuestion({
    documentId,
    userId,
    question
  });

  return reply.status(200).send({
    message: 'Answer generated successfully',
    data: result
  });
}

export async function getChatHistoryHandler(request, reply) {
  const userId = request.user.sub;
  const { id: documentId } = request.params;

  const history = await ragService.getChatHistory(documentId, userId);

  return reply.status(200).send({
    data: history
  });
}
