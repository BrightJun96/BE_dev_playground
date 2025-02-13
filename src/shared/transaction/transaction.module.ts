import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TypeormTransactionAdapter } from "./adapter/typeorm-transaction.adapter";

@Module({
  providers: [
    {
      provide: "TransactionManagerPort",
      useFactory: (dataSource: DataSource) =>
        new TypeormTransactionAdapter(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ["TransactionManagerPort"],
})
export class TransactionModule {}
