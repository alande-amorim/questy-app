import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { User } from "../../entities";
import cognito from "./cognito";

type SignUpResponse = {
  success: boolean;
  message?: string;
};

async function signUp({
  email,
  password,
  name,
}: User.SignUp): Promise<SignUpResponse> {
  const command = new SignUpCommand({
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "name",
        Value: name,
      },
    ],
  });

  try {
    await cognito.send(command);
    return { success: true };
  } catch (error) {
    let message = `Failed to sign up ${email}.`;
    if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      message,
    };
  }
}

export default signUp;
