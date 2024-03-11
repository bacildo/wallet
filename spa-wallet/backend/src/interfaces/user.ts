export interface IPeople {
  nome: string;
  idade: number;
  id: number;
  profissao: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export const notFoundPeople = (): IPeople => {
  return {
    nome: "",
    idade: 0,
    id: 0,
    profissao: "",
  };
};

export const JsonPeople = (options: { people: IPeople }) => {
  return {
    nome: options.people.nome,
    idade: options.people.idade,
    id: options.people.id,
    profissao: options.people.profissao,
  };
};
