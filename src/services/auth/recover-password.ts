import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognito from "./cognito";

type RecoverPasswordResponse = {
  success: boolean;
  message?: string;
  errorType?: string;
};

async function recoverPassword(
  email: string
): Promise<RecoverPasswordResponse> {
  const command = new ForgotPasswordCommand({
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Username: email,
  });

  try {
    const response = await cognito.send(command);
    console.log(response);
    return {
      success: true,
    };
  } catch (error) {
    const _error: RecoverPasswordResponse = {
      success: false,
      message: "Unable to recover password",
    };
    if (error instanceof Error) {
      _error.message = error.message;
      _error.errorType = error.name;
    }
    return _error;
  }
}

export default recoverPassword;
