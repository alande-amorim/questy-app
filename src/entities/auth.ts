import { User as UserEntity } from "./user";

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

  export type IdToken = {
    sub: string;
    email_verified: true;
    iss: string;
    cognitousername: string;
    origin_jti: string;
    aud: string;
    event_id: string;
    token_use: string;
    auth_time: number;
    name: string;
    exp: number;
    iat: number;
    jti: string;
    email: string;
  };

  export type User = UserEntity.Fields & { token: string };
}
