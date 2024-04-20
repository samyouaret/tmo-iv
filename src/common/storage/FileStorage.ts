import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';

@Injectable()
export class FileStorage {
  async delete(path: string): Promise<true | NodeJS.ErrnoException> {
    return new Promise((resolve, reject) => {
      unlink(path, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
}
