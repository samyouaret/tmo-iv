import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHash {
  static async hash(password: string | Buffer) {
    return bcrypt.hash(password, 10);
  }

  static async match(password: string | Buffer, encrypted: string) {
    return bcrypt.compare(password, encrypted);
  }
}
