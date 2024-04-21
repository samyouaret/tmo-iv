import { ValueTransformer } from 'typeorm';

export class ColumnDecimalTransformer implements ValueTransformer {
  /**
   * Used to marshal Decimal when writing to the database.
   */
  to(decimal: number): string | null {
    return decimal?.toString();
  }
  /**
   * Used to unmarshal Decimal when reading from the database.
   */
  from(decimal?: string): number | null {
    return decimal ? parseFloat(decimal) : null;
  }
}
