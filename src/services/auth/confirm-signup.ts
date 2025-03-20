import { ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognito from "./cognito";

type ConfirmSignUp = {
  email: string;
  code: string;
};

type ConfirmSignUpResponse = {
  success: boolean;
  message?: string;
};

async function confirmSignUp({
  email,
  code,
}: ConfirmSignUp): Promise<ConfirmSignUpResponse> {
  const command = new ConfirmSignUpCommand({
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });

  try {
    await cognito.send(command);
    return { success: true };
  } catch (error) {
    let message = `Failed to confirm sign up for ${email}.`;
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
    };
  }
}

export default confirmSignUp;
