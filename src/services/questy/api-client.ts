import { Api } from "./http-client";

const questyApiClient = new Api({
  baseUrl: process.env.REACT_APP_QUESTY_API_URL,
});

export default questyApiClient;
