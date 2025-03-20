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
}
