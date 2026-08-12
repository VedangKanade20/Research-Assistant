import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';

export class GeminiService {
  constructor() {
    this.apiKey = config.geminiApiKey;
    if (this.apiKey) {
      this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    }
  }

  /**
   * Generates document executive summary using Gemini 3.6 Flash / Latest model
   * @param {string} text 
   * @returns {Promise<string>}
   */
  async generateSummary(text) {
    if (!this.apiKey || !this.ai) {
      console.warn('Gemini API key missing. Skipping AI summarization.');
      return 'Summary pending (Gemini API key not configured).';
    }

    try {
      const prompt = `You are a senior research assistant. Provide a concise, highly structured 3-4 sentence executive summary of the following document content:\n\n${text.slice(0, 8000)}`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.6-flash', // Gemini 3.6 Flash model
        contents: prompt,
      });

      return response.text ? response.text.trim() : 'Summary unavailable.';
    } catch (err) {
      console.error('Gemini Summarization Error:', err.message);
      return 'Summary generation failed due to API error.';
    }
  }

  /**
   * Generates 768-dimensional embeddings for an array of text chunks using gemini-embedding-001
   * @param {Array<string>} textArray 
   * @returns {Promise<Array<Array<number>>>}
   */
  async generateEmbeddings(textArray) {
    if (!this.apiKey || !this.ai || textArray.length === 0) {
      return textArray.map(() => new Array(768).fill(0));
    }

    try {
      const embeddings = [];
      for (const text of textArray) {
        const response = await this.ai.models.embedContent({
          model: 'gemini-embedding-001',
          contents: text,
          config: {
            outputDimensionality: 768
          }
        });

        const vector = response.embeddings?.[0]?.values || new Array(768).fill(0);
        embeddings.push(vector);
      }
      return embeddings;
    } catch (err) {
      console.error('Gemini Embedding Error:', err.message);
      return textArray.map(() => new Array(768).fill(0));
    }
  }

  /**
   * Generates a grounded, hallucination-free answer using Gemini 3.6 Flash
   * @param {string} question 
   * @param {Array<string>} contextChunks 
   * @returns {Promise<{ answer: string, tokensUsed: number }>}
   */
  async generateGroundedAnswer(question, contextChunks) {
    if (!this.apiKey || !this.ai) {
      return {
        answer: 'API key not configured. Unable to process answer.',
        tokensUsed: 0
      };
    }

    try {
      const contextText = contextChunks.map((c, i) => `--- Snippet ${i + 1} ---\n${c}`).join('\n\n');
      
      const systemPrompt = `You are a senior AI research assistant. 
Answer the user's question strictly using ONLY the provided document context snippets below.
If the answer cannot be found in the snippets, respond clearly: "I could not find information about that in the uploaded document."
Do not make assumptions or bring in external information not present in the context.

Context Snippets:
${contextText}

User Question: ${question}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: systemPrompt,
      });

      const answer = response.text ? response.text.trim() : 'Could not generate answer.';
      const tokensUsed = response.usageMetadata?.totalTokenCount || 0;

      return { answer, tokensUsed };
    } catch (err) {
      console.error('Gemini Grounded Answer Error:', err.message);
      return {
        answer: 'Failed to generate answer due to an AI service error.',
        tokensUsed: 0
      };
    }
  }
}
