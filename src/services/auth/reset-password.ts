import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognito from "./cognito";

type ResetPasswordRequest = {
  email: string;
  resetCode: string;
  password: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message?: string;
  errorType?: string;
};

async function resetPassword({
  email,
  resetCode,
  password,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: resetCode,
    Password: password,
  });

  try {
    await cognito.send(command);
    return { success: true };
  } catch (error) {
    const _error: ResetPasswordResponse = {
      success: false,
      message: "Unable to reset password",
    };

    if (error instanceof Error) {
      _error.message = error.message;
      _error.errorType = error.name;
    }
    return _error;
  }
}

export default resetPassword;
