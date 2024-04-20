import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { extname } from 'path';

export const MEDIA_TYPES = {
  IMAGE: /(jpeg|jpg|png|webp|heic|heif|tiff)$/,
};

export function UseFileUpload(uploadField: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(uploadField, {
        storage: diskStorage({
          destination: './uploads',
          filename: (_req, file, cb) => {
            const randomName = randomBytes(16).toString('hex');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    ),
  );
}
