import {
  Body,
  // Delete,
  Get,
  JsonController,
  // Param,
  Post,
  Res,
  // Put,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import { validateToken } from "../middlewares";
import { Service } from "typedi";
import { UserEntity } from "../entities";
// import { IPeople, JsonPeople, notFoundPeople } from "../interfaces";
import {
  // PeopleGenerateCSVFiles,
  UserService,
} from "../service";
import { ILogin } from "../interfaces";
// import { ObjectId } from "mongodb";
// import { AuthMiddleware } from "../middlewares";

@Service()
@JsonController()
export class UserController {
  // private userAuth: AuthMiddleware;
  private userService: UserService;
  // private peopleGenerateCSVFiles: PeopleGenerateCSVFiles;

  constructor() {
    // this.userAuth = new AuthMiddleware();
    // this.peopleGenerateCSVFiles = new PeopleGenerateCSVFiles();
    this.userService = new UserService();
  }

  @Get("/me")
  @UseBefore(validateToken)
  public async userLogged(@Res() res: Response): Promise<Response> {
    const { _id: id } = res.locals.user;

    try {
      const me = await this.userService.loggedUser(id);
      return res.status(201).send(me);
    } catch (error) {
      return res.status(401).send({ message: "User not found!" });
    }
  }

  @Post("/register")
  public async registerUser(@Body() user: UserEntity): Promise<UserEntity> {
    if (Object.keys(user).length == 0) {
      throw new Error("Please inform the user data");
    } else {
      return await this.userService.registerUser(user);
    }
  }

  @Post("/user-login")
  public async loginUser(
    @Body() user: ILogin,
    @Res() res: Response
  ): Promise<any> {
    try {
      const token = await this.userService.loginUser(user.email, user.password);
      return res.status(201).send(token);
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  // }
  // @Put("/people/:id")
  // public async updatePerson(
  //   @Param("id") id: string,
  //   @Body() people: PeopleEntity
  // ): Promise<PeopleEntity | IPeople> {
  //   return await this.people.editPeopleService(id, people);
  // }
  // @Delete("/people/:id")
  // public async deletePerson(@Param("id") id: string): Promise<string> {
  //   const objectId = new ObjectId(id);
  //   try {
  //     await this.people.deletePeopleService(objectId);
  //     return "Person deleted successfully";
  //   } catch (error) {
  //     throw new Error(`Error deleting person: ${error}`);
  //   }
  // }
  // @Get("/people-csv")
  // public async getAllPeopleCsv(): Promise<
  //   { message: string } | { data: IPeople[] }
  // > {
  //   const peopleCsv =
  //     await this.peopleGenerateCSVFiles.generatePeopleCSVFiles();

  //   if (peopleCsv) {
  //     const people = await this.people.findAllPeopleService();

  //     const jsonPeopleList = people.map((person: IPeople) =>
  //       JsonPeople({ people: person })
  //     );

  //     if (!jsonPeopleList || jsonPeopleList.length === 0) {
  //       return {
  //         message:
  //           "CSV generation completed successfully, but no data was generated.",
  //       };
  //     }
  //     return { data: jsonPeopleList };
  //   } else {
  //     return {
  //       message: "CSV generation failed.",
  //     };
  //   }
  // }
}
