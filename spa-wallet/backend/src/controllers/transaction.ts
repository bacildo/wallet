import {
  Body,
  // Delete,
  Get,
  JsonController,
  Param,
  Post,
  Res,
  UseBefore,
  Put,
} from "routing-controllers";
import { Response } from "express";

import { Service } from "typedi";
import { TransactionEntity } from "../entities";
// import { IPeople, JsonPeople, notFoundPeople } from "../interfaces";
import {
  // PeopleGenerateCSVFiles,
  TransactionService,
} from "../service";
import { validateToken } from "../middlewares";
// import { ObjectId } from "mongodb";
// import { AuthMiddleware } from "../middlewares";

@Service()
@JsonController()
export class TransactionController {
  // private userAuth: AuthMiddleware;
  private transactionService: TransactionService;
  // private peopleGenerateCSVFiles: PeopleGenerateCSVFiles;

  constructor() {
    // this.userAuth = new AuthMiddleware();
    // this.peopleGenerateCSVFiles = new PeopleGenerateCSVFiles();
    this.transactionService = new TransactionService();
  }
  // @Get("/people/:id")
  // public async getPerson(
  //   @Param("id") id: string
  // ): Promise<PeopleEntity[] | IPeople> {
  //   const objectId = new ObjectId(id);
  //   const people = await this.people.findPersonService(objectId);
  //   if (!people.length) {
  //     return notFoundPeople();
  //   }
  //   return people;
  // }
  @Get("/")
  @UseBefore(validateToken)
  public async getAllTransactionsById(@Res() res: Response): Promise<Response> {
    const { _id: id } = res.locals.user;
    try {
      const transactions =
        await this.transactionService.findAllTransactionsByUser(id);
      return res.status(201).send(transactions);
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  @Post("/")
  @UseBefore(validateToken)
  public async createTransaction(
    @Body() transact: TransactionEntity,
    @Res() res: Response
  ): Promise<any> {
    const { _id: id } = res.locals.user;
    console.log("sdsddsdsdds", res.locals.user);
    try {
      const transaction = await this.transactionService.registerTransaction(
        transact,
        id
      );
      return res.status(201).send(transaction);
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  @Put("/:id")
  @UseBefore(validateToken)
  public async update(
    @Param("id") id: string,
    @Body() body: TransactionEntity,
    @Res() res: Response
  ): Promise<Response> {
    const { _id: userId } = res.locals.user;
    const userIdToString = userId.toString()
    console.log("sdsddsddsdds", res.locals.user._id);
    try {
      console.log('xxxxxxx',userIdToString)
      console.log('zzzzzzz',id)
      await this.transactionService.editTransaction(id, body, 
        userIdToString
        );
      return res.send({ message: "success!" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

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
