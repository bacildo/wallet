import { Service } from "typedi";
import { PeopleEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";
import { ObjectId } from "mongodb";

@Service()
export class PeopleRepository extends Abstract<PeopleEntity> {
  constructor() {
    super(Database.mongo, PeopleEntity);
  }
  async findPerson(id: ObjectId): Promise<PeopleEntity[]> {
    try {
      const result = await this.mongoRepository.find({
        select: ["nome", "idade", "id", "profissao"],
        where: { _id: id },
      });

      result.map((person) => {
        person._id = person._id.toString();
      });
      return result;
    } catch (error) {
      throw new Error(`${error}, Person not found`);
    }
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    try {
      const result = await this.mongoRepository.find();
      result.map((person) => {
        person._id = person._id.toString();
      });
      return result;
    } catch (error) {
      throw new Error(`${error}, People list not found`);
    }
  }

  async createPerson(person: PeopleEntity): Promise<PeopleEntity> {
    try {
      const result = await this.mongoRepository.save(person);
      return result;
    } catch (error) {
      throw new Error(`${error}, Person not created`);
    }
  }

  async editPerson(id: string, person: PeopleEntity): Promise<PeopleEntity> {
    try {
      const updatedPerson = await this.mongoRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: person },
        { returnDocument: "after" },     
      );
      if (!updatedPerson || updatedPerson.value === null) {
        throw new Error(`Person with id ${id} not found`);
      }
      return updatedPerson.value;
    } catch (error) {
      throw new Error(`${error}, Person not updated`);
    }
  }

  async deletePerson(id: ObjectId): Promise<string | void> {
    try {
      const result = await this.mongoRepository.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        throw new Error(`Person with id ${id} not found`);
      }
      return `Person with id ${id} deleted successfully`;

    } catch (error) {
      throw new Error(`${error}, Person not deleted`);
    }
   
  }
}
