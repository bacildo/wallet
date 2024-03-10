import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("people")
export class PeopleEntity {
  @ObjectIdColumn()
  _id!: ObjectId | string;

  @Column()
  nome!: string;

  @Column()
  idade!: number;

  @Column()
  id!: number;

  @Column()
  profissao!: string;
}
