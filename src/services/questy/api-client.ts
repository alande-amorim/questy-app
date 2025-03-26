import { Api, FullRequestParams, HttpResponse } from "./http-client";

const getAuthHeaders = (): Record<string, string> => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return {};

  const user = JSON.parse(userStr);
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const questyApiClient = new Api({
  baseUrl: process.env.REACT_APP_QUESTY_API_URL,
  baseApiParams: {
    headers: {},
  },
});

// Override the request method to add headers dynamically
const originalRequest = questyApiClient.request.bind(questyApiClient);
questyApiClient.request = async <T = any, E = any>(
  params: FullRequestParams
): Promise<HttpResponse<T, E>> => {
  return originalRequest({
    ...params,
    headers: {
      ...params.headers,
      ...getAuthHeaders(),
    },
  });
};

export default questyApiClient;
