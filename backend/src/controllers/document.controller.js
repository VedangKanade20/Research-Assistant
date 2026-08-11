import { DocumentService } from '../services/document.service.js';
import { BadRequestError } from '../utils/errors.js';

const documentService = new DocumentService();

export async function getDocumentsHandler(request, reply) {
  const userId = request.user.sub;
  const docs = await documentService.getUserDocuments(userId);
  return reply.status(200).send({ data: docs });
}

export async function getDocumentByIdHandler(request, reply) {
  const userId = request.user.sub;
  const { id } = request.params;
  const doc = await documentService.getDocumentById(id, userId);
  return reply.status(200).send({ data: doc });
}

export async function uploadDocumentHandler(request, reply) {
  const userId = request.user.sub;
  const data = await request.file();

  if (!data) {
    throw new BadRequestError('No file uploaded');
  }

  const allowedTypes = ['application/pdf', 'text/plain'];
  if (!allowedTypes.includes(data.mimetype)) {
    throw new BadRequestError('Only PDF and TXT files are allowed');
  }

  const fileBuffer = await data.toBuffer();
  
  const document = await documentService.processAndSaveUpload({
    userId,
    fileBuffer,
    filename: data.filename,
    mimeType: data.mimetype
  });

  return reply.status(201).send({
    message: 'Document uploaded and processed successfully',
    data: document
  });
}

export async function deleteDocumentHandler(request, reply) {
  const userId = request.user.sub;
  const { id } = request.params;
  await documentService.deleteDocument(id, userId);

  return reply.status(200).send({
    message: 'Document deleted successfully'
  });
}
