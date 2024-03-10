import "reflect-metadata";
import { Service } from "typedi";
import { DataSource } from "typeorm";
import { databaseEnabled, mongoOptions } from "../config";

@Service()
export class Database {
  private static dataSourceMongo: DataSource;

 
  async connectMongo(): Promise<void> {
    if (databaseEnabled.mongoOptions) {
      const { type, database } = mongoOptions;
      Database.dataSourceMongo = new DataSource(mongoOptions);

      // Adicionar um atraso antes de inicializar a conexão com o MongoDB
      setTimeout(async () => {
        try {
          await Database.dataSourceMongo.initialize();
          console.log("Successfully Connected!", type, database);
        } catch (error) {
          console.error("Connection Failed!", type, error);
        }
      }, 1000); // Atraso de 1 segundo (1000 milissegundos)
    }
  }

  public static get mongo(): DataSource {
    return Database.dataSourceMongo;
  }

  public get mongoIsInitialized(): boolean {
    return Database.mongo?.isInitialized || false;
  }
}
