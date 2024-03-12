import { Service } from "typedi";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";
import { ObjectId } from "mongodb";
import { TransactionEntity } from "../../entities/mongodb/transaction";

@Service()
export class TransactionRepository extends Abstract<TransactionEntity> {
  constructor() {
    super(Database.mongo, TransactionEntity);
  }
  async findTransactionById(id: string): Promise<TransactionEntity> {
    try {
      const result = await this.mongoRepository.findOne({
        select: ["created_at", "description", "type", "value", "userId"],
        where: { _id: id },
      });
      if (!result) {
        throw new Error("Transaction not found");
      }
      return result;
    } catch (error) {
      throw new Error(`${error}, Transaction not found`);
    }
  }

  async findAllTransactionsByUser(id: string): Promise<TransactionEntity[]> {
    try {
      const result = await this.mongoRepository.find({
        select: ["created_at", "description", "type", "value"],
        where: { userId: id },
      });
      // result.map((user) => {
      //   user.userId = user.userId.toString();
      // });
      return result;
    } catch (error) {
      throw new Error(`${error}, User list not found`);
    }
  }

  async createTransaction(
    transaction: TransactionEntity
  ): Promise<TransactionEntity> {
    try {
      const result = await this.mongoRepository.save(transaction);
      return result;
    } catch (error) {
      throw new Error(`${error}, Transaction not created`);
    }
  }

  async editTransaction(
    id: string,
    transaction: TransactionEntity
  ): Promise<TransactionEntity> {
    try {
      const updatedTransaction = await this.mongoRepository.findOneAndUpdate(
        { userId: new ObjectId(id) },
        { $set: transaction },
        { returnDocument: "after" }
      );
      if (!updatedTransaction || updatedTransaction.value === null) {
        throw new Error(`Transaction with id ${id} not found`);
      }
      return updatedTransaction.value;
    } catch (error) {
      throw new Error(`${error}, User not updated`);
    }
  }

  async deleteTransaction(id: string): Promise<string | void> {
    try {
      const result = await this.mongoRepository.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        throw new Error(`User with id ${id} not found`);
      }
      return `Transaction with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`${error}, Transaction not deleted`);
    }
  }
}
