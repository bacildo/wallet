import { Service } from "typedi";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";
// import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// import { ILogin } from "../interfaces";
// import { configSecret } from "../config";
// import jwt from "jsonwebtoken";


@Service()
export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(body: UserEntity):Promise<UserEntity> {
    const passwordVerify = bcrypt.hashSync(body.password, 10);
    const userVerify = await this.repository.findUserByEmail(body.email);

    if (userVerify) throw new Error("User already exists!");

    return await this.repository.createUser({
      ...body,
      password: passwordVerify,
    });
  }

  async loggedUser(id:string){
    const user = await this.repository.findUserById(id)
    if(!user) throw new Error("User not found!");
    return user;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const userVerify = await this.repository.findUserByEmail(email);
    if (!userVerify) {
      throw new Error("Email incorrect!");
    }
    
    const passwordVerify = bcrypt.compareSync(password, userVerify.password);
    if (!passwordVerify) {
      throw new Error("Password incorrect!");
    }

    return await this.repository.generateToken(userVerify._id.toString());
  }




  // async editPeopleService(
  //   id: string,
  //   people: PeopleEntity
  // ): Promise<PeopleEntity> {
  //   return await this.repository.editPerson(id, people);
  // }

  // async deletePeopleService(id: ObjectId): Promise<string | void> {
  //   await this.repository.deletePerson(id);
  // }
}
