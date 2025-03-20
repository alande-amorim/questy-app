export namespace Auth {
  export namespace SignIn {
    export type Request = {
      email: string;
      password: string;
    };

    export type Response = unknown;
  }

  export namespace SignUp {
    export type Request = {
      name: string;
      email: string;
      password: string;
    };

    export type Response = unknown;
  }

  export namespace RecoverPassword {
    export type Request = {
      email: string;
    };

    export type Response = unknown;
  }

  export namespace ResetPassword {
    export type Request = {
      email: string;
    };

    export type Response = unknown;
  }
}
