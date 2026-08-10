import { DocumentService } from '../services/document.service.js';

const documentService = new DocumentService();

export async function getDocumentsHandler(request, reply) {
  const userId = request.user.sub;
  const docs = await documentService.getUserDocuments(userId);
  
  return reply.status(200).send({
    data: docs
  });
}
