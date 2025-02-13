import { DataSource } from "typeorm";
import { TransactionManagerPort } from "./port/transaction-manager.port";

export class TypeormTransactionAdapter
  implements TransactionManagerPort
{
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    fn: () => Promise<T>,
  ): Promise<T> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const result = await fn();

      await qr.commitTransaction();
      await qr.release();

      return result;
    } catch (e) {
      await qr.rollbackTransaction();
      await qr.release();
      throw e;
    }
  }
}
