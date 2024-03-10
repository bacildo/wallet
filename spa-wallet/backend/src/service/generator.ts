import * as fs from "fs";
import { Json2CsvOptions } from "json-2-csv";
import * as json2csv from "json2csv";
import { Service } from "typedi";
import { v4 as uuid } from "uuid";

@Service()
export class GeneratorService {
  async generateCsv(data: object[], options: Json2CsvOptions) {
    try {
      const csvOptions = {
        ...options,
        delimiter: options.delimiter ? String(options.delimiter) : undefined,
      };
      const csv = await json2csv.parseAsync(data, csvOptions);
      const fileName = uuid() + ".csv";
      const dir = "../files/";
      const filePath = `${dir}${fileName}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFile(filePath, csv, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

      return true;
      
    } catch (error) {
      throw new Error(`${error}, File not saved!`);
    }
  }
}
