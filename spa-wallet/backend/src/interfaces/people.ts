export interface IPeople {
  nome: string;
  idade: number;
  id: number;
  profissao: string;
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
