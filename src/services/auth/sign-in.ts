import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognito from "./cognito";
import { Auth } from "../../entities/auth";
import { jwtDecode } from "jwt-decode";

type SignInResponse = {
  success: boolean;
  errorType?: string;
  message?: string;
  user?: Auth.User;
};

async function signIn({
  email,
  password,
}: Auth.SignIn.Request): Promise<SignInResponse> {
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
    const idToken = response.AuthenticationResult?.IdToken;
    const accessToken = response.AuthenticationResult?.AccessToken;

    if (!idToken || !accessToken) {
      return { success: false, message: "Token not received from Cognito." };
    }

    const decodedIdToken = jwtDecode<Auth.IdToken>(idToken);

    const user: Auth.User = {
      id: decodedIdToken.sub,
      name: decodedIdToken.name,
      email,
      token: accessToken,
    };

    return { success: true, user };
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
