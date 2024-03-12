import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
import { createClient } from 'redis';
export const sourcepath = resolve(__dirname, '../../');

export const mongoOptions: DataSourceOptions = {
  type: 'mongodb',
  name: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'dev',
  useUnifiedTopology: true,
  logging: ['error'],
  entities: [`${sourcepath}/entities/mongodb/*.{js,ts}`],
};

export const configSecret = {
  secret:'SECRET'
}

export const redisOptions = {
  host: 'localhost',
  port: 6379,
};

export const redisClient = createClient(redisOptions as any);

export const databaseEnabled ={
  mysqlOptions: false,
  mongoOptions:true
}

export const serverPort = {
  port: 3000
}