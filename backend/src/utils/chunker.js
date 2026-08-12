/**
 * Splits text into overlapping chunks
 * @param {string} text 
 * @param {number} chunkSize Maximum characters per chunk (~500-1000 tokens)
 * @param {number} overlap Overlap characters between sliding windows
 * @returns {Array<{ chunkIndex: number, content: string }>}
 */
export function chunkText(text, chunkSize = 1000, overlap = 150) {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const cleanText = text.replace(/\r\n/g, '\n');
  const chunks = [];
  let startIndex = 0;
  let chunkIndex = 0;

  while (startIndex < cleanText.length) {
    let endIndex = startIndex + chunkSize;

    // If not at the end of text, attempt to break on paragraph or sentence boundary
    if (endIndex < cleanText.length) {
      const nextNewline = cleanText.lastIndexOf('\n', endIndex);
      const nextPeriod = cleanText.lastIndexOf('. ', endIndex);
      
      const bestBreak = Math.max(nextNewline, nextPeriod);
      if (bestBreak > startIndex + chunkSize / 2) {
        endIndex = bestBreak + 1;
      }
    }

    const content = cleanText.slice(startIndex, endIndex).trim();
    if (content.length > 0) {
      chunks.push({
        chunkIndex,
        content
      });
      chunkIndex++;
    }

    startIndex = endIndex - overlap;
    if (startIndex >= cleanText.length - overlap && endIndex >= cleanText.length) {
      break;
    }
  }

  return chunks;
}
