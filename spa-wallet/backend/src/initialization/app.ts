import "reflect-metadata";
import { Database, Server } from "./index";

export class App {
  private server = new Server();
  private databaseMongo = new Database();

  async appInitialize(): Promise<Server> {
    // Inicia a conexão com o MySQL e o MongoDB
    await this.databaseMongo.connectMongo();

    // Adiciona um atraso antes de iniciar o servidor Express
    setTimeout(() => {
      this.server.init();
      this.server.start();
    }, 1500); // Atraso de 1,5 segundo (1500 milissegundos)

    return this.server;
  }
}
