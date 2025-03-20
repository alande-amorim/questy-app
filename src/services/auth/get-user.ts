import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognito from "./cognito";

export default async function getUser(accessToken: string) {
  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const userResponse = await cognito.send(command);

  const user = {
    email: userResponse.Username,
    name: userResponse.UserAttributes?.find((attr) => attr.Name === "name")
      ?.Value,
  };

  return {
    success: true,
    data: user,
    token: "",
  };
}
