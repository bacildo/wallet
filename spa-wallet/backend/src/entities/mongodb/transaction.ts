import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
} from "typeorm";
import { UserEntity } from "./user";
import { ObjectId } from "mongodb";

@Entity("transaction")
export class TransactionEntity {
  @ObjectIdColumn()
  _id!: ObjectId | string;

  @Column()
  value!: number;

  @Column()
  description!: string;

  @Column()
  type!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "_id" })
  userId!: UserEntity | string;

  @CreateDateColumn()
  created_at!: Date;
}
