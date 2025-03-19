import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { User } from "../../entities";

const client = new CognitoIdentityProviderClient({
  region: process.env.REACT_APP_COGNITO_REGION,
});

async function signUp({ email, password, name }: User.SignUp): Promise<void> {
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

  const response = await client.send(command);
  console.log(response);
}

export default signUp;
