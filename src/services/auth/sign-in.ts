import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { User } from "../../entities";
import cognito from "./cognito";

type SignInResponse = {
  success: boolean;
  errorType?: string;
  message?: string;
};

async function signIn({
  email,
  password,
}: User.SignIn): Promise<SignInResponse> {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  try {
    const response = await cognito.send(command);
    console.log(response);
    return { success: true };
  } catch (error) {
    const _error: SignInResponse = {
      success: false,
      message: `Failed to sign in.`,
    };
    if (error instanceof Error) {
      _error.errorType = error.name;
      _error.message = error.message;
    }

    return _error;
  }
}

export default signIn;
