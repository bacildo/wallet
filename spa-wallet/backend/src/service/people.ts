import { Service } from "typedi";
import { PeopleEntity } from "../entities";
import { PeopleRepository } from "../repositories";
import { ObjectId } from "mongodb";

@Service()
export class PeopleService {
  private repository: PeopleRepository;

  constructor() {
    this.repository = new PeopleRepository();
  }
  async findPersonService(id: ObjectId): Promise<PeopleEntity[]> {
    return await this.repository.findPerson(id);
  }

  async findAllPeopleService(): Promise<PeopleEntity[]> {
    return await this.repository.findAllPeople();
  }

  async createPeopleService(people: PeopleEntity): Promise<PeopleEntity> {
    return await this.repository.createPerson(people);
  }

  async editPeopleService(
    id: string,
    people: PeopleEntity
  ): Promise<PeopleEntity> {
    return await this.repository.editPerson(id, people);
  }

  async deletePeopleService(id: ObjectId): Promise<string | void> {
    await this.repository.deletePerson(id);
  }
}
