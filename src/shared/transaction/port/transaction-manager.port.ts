export interface TransactionManagerPort {
  runInTransaction<T>(fn: () => Promise<T>): Promise<T>;
}
