import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { ChromaClient } from 'chromadb';

export interface DocumentMetadata {
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  pageCount?: number;
  wordCount?: number;
  extractedText: string;
  language?: string;
  keywords?: string[];
  summary?: string;
}

export interface ProcessingResult {
  success: boolean;
  metadata: DocumentMetadata;
  embeddings?: number[][];
  error?: string;
}

export class DocumentProcessor {
  private chromaClient: ChromaClient;

  constructor() {
    this.chromaClient = new ChromaClient({
      path: process.env.CHROMA_SERVER_HOST || 'localhost',
      port: process.env.CHROMA_SERVER_HTTP_PORT || '8000'
    });
  }

  async processDocument(
    fileBuffer: Buffer,
    fileName: string,
    fileType: string,
    userId: string
  ): Promise<ProcessingResult> {
    try {
      logger.info('Starting document processing', { fileName, fileType, userId });

      let extractedText = '';
      let metadata: Partial<DocumentMetadata> = {
        title: fileName.replace(/\.[^/.]+$/, ''),
        fileName,
        fileType,
        fileSize: fileBuffer.length
      };

      // Extract text based on file type
      switch (fileType.toLowerCase()) {
        case 'pdf':
          const pdfResult = await this.processPDF(fileBuffer);
          extractedText = pdfResult.text;
          metadata.pageCount = pdfResult.pageCount;
          metadata.wordCount = this.countWords(extractedText);
          break;

        case 'docx':
          const docxResult = await this.processDOCX(fileBuffer);
          extractedText = docxResult.text;
          metadata.wordCount = this.countWords(extractedText);
          break;

        case 'xlsx':
        case 'xls':
          const excelResult = await this.processExcel(fileBuffer);
          extractedText = excelResult.text;
          metadata.wordCount = this.countWords(extractedText);
          break;

        case 'txt':
          extractedText = fileBuffer.toString('utf-8');
          metadata.wordCount = this.countWords(extractedText);
          break;

        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }

      // Generate metadata
      const fullMetadata: DocumentMetadata = {
        ...metadata,
        extractedText,
        language: this.detectLanguage(extractedText),
        keywords: this.extractKeywords(extractedText),
        summary: this.generateSummary(extractedText)
      } as DocumentMetadata;

      // Generate embeddings
      const embeddings = await this.generateEmbeddings(extractedText);

      // Store document in database
      const document = await this.storeDocument(fullMetadata, userId);

      // Store embeddings in ChromaDB
      if (embeddings.length > 0) {
        await this.storeEmbeddings(document.id, embeddings, fullMetadata);
      }

      logger.info('Document processing completed successfully', {
        documentId: document.id,
        fileName,
        wordCount: fullMetadata.wordCount
      });

      return {
        success: true,
        metadata: fullMetadata,
        embeddings
      };

    } catch (error) {
      logger.error('Document processing failed', {
        fileName,
        fileType,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return {
        success: false,
        metadata: {
          title: fileName,
          fileName,
          fileType,
          fileSize: fileBuffer.length,
          extractedText: '',
          language: 'unknown',
          keywords: [],
          summary: ''
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async processPDF(buffer: Buffer): Promise<{ text: string; pageCount: number }> {
    try {
      const data = await pdf(buffer);
      return {
        text: data.text,
        pageCount: data.numpages
      };
    } catch (error) {
      throw new Error(`PDF processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async processDOCX(buffer: Buffer): Promise<{ text: string }> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return {
        text: result.value
      };
    } catch (error) {
      throw new Error(`DOCX processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async processExcel(buffer: Buffer): Promise<{ text: string }> {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      let text = '';

      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        for (const row of jsonData) {
          if (Array.isArray(row)) {
            text += row.join(' ') + ' ';
          }
        }
      }

      return { text: text.trim() };
    } catch (error) {
      throw new Error(`Excel processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private detectLanguage(text: string): string {
    // Simple language detection based on common words
    // In production, use a proper language detection library
    const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of'];
    const spanishWords = ['el', 'la', 'y', 'o', 'pero', 'en', 'sobre', 'a', 'para', 'de'];
    
    const textLower = text.toLowerCase();
    const englishCount = englishWords.filter(word => textLower.includes(word)).length;
    const spanishCount = spanishWords.filter(word => textLower.includes(word)).length;
    
    if (englishCount > spanishCount) return 'en';
    if (spanishCount > englishCount) return 'es';
    return 'unknown';
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction - in production, use NLP libraries
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private generateSummary(text: string): string {
    // Simple summary generation - in production, use AI models
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const summarySentences = sentences.slice(0, 3);
    return summarySentences.join('. ').trim() + '.';
  }

  private async generateEmbeddings(text: string): Promise<number[][]> {
    try {
      // Split text into chunks for embedding generation
      const chunks = this.splitTextIntoChunks(text, 1000);
      const embeddings: number[][] = [];

      for (const chunk of chunks) {
        // In production, use your AI provider manager to generate embeddings
        // For now, we'll create placeholder embeddings
        const embedding = this.createPlaceholderEmbedding(chunk);
        embeddings.push(embedding);
      }

      return embeddings;
    } catch (error) {
      logger.error('Failed to generate embeddings', { error });
      return [];
    }
  }

  private splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }

  private createPlaceholderEmbedding(text: string): number[] {
    // Placeholder embedding - replace with actual AI embedding generation
    const embeddingSize = 1536; // OpenAI embedding size
    const embedding: number[] = [];
    
    for (let i = 0; i < embeddingSize; i++) {
      // Generate deterministic "random" numbers based on text
      const hash = text.split('').reduce((a, b) => {
        a = ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff;
        return a;
      }, 0);
      embedding.push(Math.sin(hash + i) * 0.1);
    }
    
    return embedding;
  }

  private async storeDocument(metadata: DocumentMetadata, userId: string) {
    return await prisma.document.create({
      data: {
        title: metadata.title,
        fileName: metadata.fileName,
        fileType: metadata.fileType,
        fileSize: metadata.fileSize,
        fileUrl: '', // Set actual file URL when storing to cloud storage
        userId,
        isProcessed: true,
        metadata: {
          pageCount: metadata.pageCount,
          wordCount: metadata.wordCount,
          language: metadata.language,
          keywords: metadata.keywords,
          summary: metadata.summary
        }
      }
    });
  }

  private async storeEmbeddings(documentId: string, embeddings: number[][], metadata: DocumentMetadata) {
    try {
      const collection = await this.chromaClient.getOrCreateCollection({
        name: 'documents',
        metadata: { 'hnsw:space': 'cosine' }
      });

      const documents = embeddings.map((_, index) => 
        `Document ${documentId} - Chunk ${index + 1}`
      );
      
      const metadatas = embeddings.map((_, index) => ({
        documentId,
        chunkIndex: index,
        title: metadata.title,
        fileName: metadata.fileName,
        fileType: metadata.fileType,
        language: metadata.language,
        keywords: metadata.keywords
      }));

      await collection.add({
        ids: embeddings.map((_, index) => `${documentId}_${index}`),
        embeddings: embeddings,
        documents,
        metadatas
      });

      logger.info('Embeddings stored in ChromaDB', { documentId, embeddingCount: embeddings.length });
    } catch (error) {
      logger.error('Failed to store embeddings in ChromaDB', { documentId, error });
    }
  }

  async searchDocuments(query: string, userId: string, limit: number = 10): Promise<any[]> {
    try {
      // Generate query embedding
      const queryEmbedding = this.createPlaceholderEmbedding(query);
      
      // Search in ChromaDB
      const collection = await this.chromaClient.getCollection({
        name: 'documents'
      });

      const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: limit,
        where: { userId }
      });

      // Fetch full document details from database
      const documentIds = [...new Set(results.ids[0]?.map(id => id.split('_')[0]) || [])];
      const documents = await prisma.document.findMany({
        where: { id: { in: documentIds } },
        include: { user: { select: { firstName: true, lastName: true } } }
      });

      return documents.map(doc => ({
        ...doc,
        relevanceScore: results.distances?.[0]?.[0] || 0
      }));
    } catch (error) {
      logger.error('Document search failed', { query, userId, error });
      return [];
    }
  }

  async deleteDocument(documentId: string, userId: string): Promise<boolean> {
    try {
      // Delete from database
      await prisma.document.delete({
        where: { id: documentId, userId }
      });

      // Delete embeddings from ChromaDB
      const collection = await this.chromaClient.getCollection({
        name: 'documents'
      });

      await collection.delete({
        where: { documentId }
      });

      logger.info('Document deleted successfully', { documentId, userId });
      return true;
    } catch (error) {
      logger.error('Failed to delete document', { documentId, userId, error });
      return false;
    }
  }
}

export const documentProcessor = new DocumentProcessor();