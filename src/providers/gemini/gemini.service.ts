import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import { PATH_DELIMITER, ValidGeminiMimeType } from '~/common/constants';

@Injectable()
export class GeminiService {
  private fileManager: GoogleAIFileManager;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  constructor() {
    const model = 'gemini-1.5-pro';
    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model });
  }

  /** Don't forget to handle errors */
  async extractValueFromFile(buffer: Buffer, mimeType: ValidGeminiMimeType) {
    // TODO: check if mimeType is valid
    const tempDir = os.tmpdir();
    const filename = [tempDir, `image-${Date.now()}.png`].join(PATH_DELIMITER);
    fs.writeFileSync(filename, buffer);
    try {
      // fileManager.uploadFile only accepts string file paths
      // so the buffer needs to be converted to a temporary file
      const uploadResponse = await this.fileManager.uploadFile(filename, {
        displayName: `Image ${Date.now()}`,
        mimeType,
      });

      const getResponse = await this.fileManager.getFile(
        uploadResponse.file.name,
      );

      const result = await this.model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        {
          text: 'Extract the integer number visible in the image. If no number is recognized, return 0. Please respond with only the integer number, without any additional text or formatting.',
        },
      ]);

      return {
        imageUrl: getResponse.uri,
        value: parseInt(result.response.text(), 10),
      };
    } finally {
      fs.unlinkSync(filename);
    }
  }
}
