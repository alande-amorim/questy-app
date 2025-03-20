import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({
  region: process.env.REACT_APP_COGNITO_REGION,
});

export default cognito;
