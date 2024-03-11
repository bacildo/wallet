import { Service } from "typedi";
import { UserRepository } from "../repositories/noSql/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configSecret } from "../config";
import { ObjectId } from "typeorm";
@Service()
export class AuthMiddleware {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    const parts = authorization?.split(" ");
    if (parts?.length !== 2) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    try {
      const decoded = jwt.verify(token, configSecret.secret) as {
        id: ObjectId;
      };
      const user = await this.repository.findUserById(decoded.id);
      if (!user) {
        res.status(401).send({ message: "Invalid token" });
        return;
      }
      res.locals.user = user;
      next();
    } catch (error) {
      res.status(401).send({ message: "Invalid token" });
    }
  }
}
