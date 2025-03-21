export namespace User {
  export type Fields = {
    id: string;
    name: string;
    email: string;
  };

  export type SignUp = {
    name: string;
    email: string;
    password: string;
  };

  export type SignIn = {
    email: string;
    password: string;
  };

  export interface Model extends Fields {}

  export interface CreateDTO extends Fields {}

  export const mock = (): Model => ({
    id: Math.random().toString(36).substr(2, 9),
    name: Math.random().toString(36).substr(2, 9),
    email: Math.random().toString(36).substr(2, 9),
  });
}
