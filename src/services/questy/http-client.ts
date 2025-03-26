/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SigninRequestDTO {
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User password
   * @example "secret"
   */
  password: string;
}

export interface CreateProjectDTO {
  /**
   * Project code
   * @example "PRJ"
   */
  code: string | null;
  /**
   * Project name
   * @example "My Project"
   */
  name: string;
  /**
   * Project description
   * @example "A great project"
   */
  description: string;
}

export interface ProjectResponseDTO {
  /**
   * Project ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Project code
   * @example "PRJ"
   */
  code: string;
  /**
   * Project name
   * @example "My Project"
   */
  name: string;
  /**
   * Project description
   * @example "A project description"
   */
  description?: string;
  /**
   * Project creation date
   * @format date-time
   * @example "2024-03-20T10:00:00Z"
   */
  createdAt: string;
  /**
   * Project last update date
   * @format date-time
   * @example "2024-03-20T10:00:00Z"
   */
  updatedAt: string;
  /**
   * Project tasks
   * @example [{"id":"123e4567-e89b-12d3-a456-426614174000","title":"Task 1","description":"Task description","status":"TODO"}]
   */
  tasks: string[];
}

export interface UpdateProjectDTO {
  /**
   * Project name
   * @example "My Updated Project"
   */
  name?: string;
  /**
   * Project description
   * @example "An updated project description"
   */
  description?: string;
}

export interface CreateInviteDTO {
  /**
   * Email do usuário a ser convidado
   * @example "user@example.com"
   */
  email: string;
  /**
   * ID do projeto
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  projectId: string;
}

export interface InviteResponseDTO {
  /**
   * ID do projeto
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  projectId: string;
  /**
   * ID do usuário
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  userId: string;
  /**
   * Token do convite
   * @example "abc123def456"
   */
  inviteToken?: string;
  /**
   * ID do usuário que enviou o convite
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  invitedBy?: string;
  /**
   * Data em que o convite foi enviado
   * @format date-time
   * @example "2024-03-25T10:00:00Z"
   */
  invitedAt?: string;
  /**
   * Data em que o convite foi aceito
   * @format date-time
   * @example "2024-03-25T10:00:00Z"
   */
  acceptedAt?: string;
  /**
   * Data de criação do registro
   * @format date-time
   * @example "2024-03-25T10:00:00Z"
   */
  createdAt: string;
}

export interface AcceptInviteDTO {
  /**
   * Token do convite
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  token: string;
  /**
   * Nome do usuário
   * @example "John Doe"
   */
  name: string;
  /**
   * Senha do usuário
   * @example "secret"
   */
  password: string;
}

export interface UserResponseDTO {
  /**
   * ID do usuário
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * ID do usuário no Cognito
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  cognitoSub?: string;
  /**
   * Nome do usuário
   * @example "John Doe"
   */
  name: string;
  /**
   * Email do usuário
   * @example "john@example.com"
   */
  email: string;
  /**
   * Data de criação do usuário
   * @format date-time
   * @example "2024-03-25T10:00:00Z"
   */
  createdAt: string;
  /**
   * Data da última atualização do usuário
   * @format date-time
   * @example "2024-03-25T10:00:00Z"
   */
  updatedAt: string;
}

export interface CreateTaskDTO {
  /**
   * Task title
   * @example "Implement feature X"
   */
  title: string;
  /**
   * Task description
   * @example "Detailed description of the task"
   */
  description: string;
  /**
   * Task status
   * @example "BACKLOG"
   */
  status: "BACKLOG" | "DOING" | "DONE";
  /**
   * Story points
   * @example 5
   */
  storyPoints: number;
  /**
   * Assignee ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  assigneeId: string;
  /**
   * Reporter ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  reporterId: string;
}

export interface TaskResponseDTO {
  /**
   * Task ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Task title
   * @example "Implement feature X"
   */
  title: string;
  /**
   * Task description
   * @example "Detailed description of the task"
   */
  description: string;
  /**
   * Task status
   * @example "TODO"
   */
  status: "TODO" | "IN_PROGRESS" | "DONE";
  /**
   * Story points
   * @example 5
   */
  storyPoints: number;
  /**
   * Project ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  projectId: string;
  /**
   * Assignee ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  assigneeId?: string;
  /**
   * Reporter ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  reporterId: string;
  /**
   * Task creation date
   * @format date-time
   * @example "2024-03-20T10:00:00Z"
   */
  createdAt: string;
  /**
   * Task last update date
   * @format date-time
   * @example "2024-03-20T10:00:00Z"
   */
  updatedAt: string;
}

export interface UpdateTaskDTO {
  /**
   * Task title
   * @example "Updated task title"
   */
  title?: string;
  /**
   * Task description
   * @example "Updated task description"
   */
  description?: string;
  /**
   * Task status
   * @example "IN_PROGRESS"
   */
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  /**
   * Story points
   * @example 5
   */
  storyPoints?: number;
  /**
   * Assignee ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  assigneeId?: string;
  /**
   * Reporter ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  reporterId?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Questy API
 * @version 1.0
 * @contact
 *
 * API documentation for Questy
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMe
     * @summary Get current user
     * @request GET:/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "123e4567-e89b-12d3-a456-426614174000" */
          sub?: string;
          /** @example "user@example.com" */
          email?: string;
          /** @example "John Doe" */
          name?: string;
          /** @example true */
          email_verified?: boolean;
          cognito?: {
            /** @example "user@example.com" */
            username?: string;
            /** @example [] */
            groups?: string[];
          };
          dbUser?: {
            /** @example "123e4567-e89b-12d3-a456-426614174000" */
            id?: string;
            /** @example "user@example.com" */
            email?: string;
            /** @example "John Doe" */
            name?: string;
          };
        },
        any
      >({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignUp
     * @summary Sign up a new user with Cognito
     * @request POST:/auth/signup
     */
    authControllerSignUp: (
      data: {
        /** @example "user@example.com" */
        email: string;
        /** @example "password123" */
        password: string;
        /** @example "John Doe" */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerConfirmSignUp
     * @summary Confirm user signup with verification code
     * @request POST:/auth/signup/confirm
     */
    authControllerConfirmSignUp: (
      data: {
        /** @example "user@example.com" */
        email: string;
        /** @example "123456" */
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/auth/signup/confirm`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignIn
     * @summary Sign in with Cognito credentials
     * @request POST:/auth/signin
     */
    authControllerSignIn: (data: SigninRequestDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags projects
     * @name ProjectsControllerCreate
     * @summary Create a new project
     * @request POST:/projects
     * @secure
     */
    projectsControllerCreate: (data: CreateProjectDTO, params: RequestParams = {}) =>
      this.request<ProjectResponseDTO, any>({
        path: `/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsControllerFindMany
     * @summary Get all projects
     * @request GET:/projects
     * @secure
     */
    projectsControllerFindMany: (params: RequestParams = {}) =>
      this.request<ProjectResponseDTO[], any>({
        path: `/projects`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsControllerFindById
     * @summary Get a project by ID
     * @request GET:/projects/{id}
     * @secure
     */
    projectsControllerFindById: (id: any, params: RequestParams = {}) =>
      this.request<ProjectResponseDTO, void>({
        path: `/projects/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsControllerUpdate
     * @summary Update a project
     * @request PUT:/projects/{id}
     * @secure
     */
    projectsControllerUpdate: (id: any, data: UpdateProjectDTO, params: RequestParams = {}) =>
      this.request<ProjectResponseDTO, void>({
        path: `/projects/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsControllerDelete
     * @summary Delete a project
     * @request DELETE:/projects/{id}
     * @secure
     */
    projectsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/projects/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Cria um convite para um usuário participar de um projeto. O convite será enviado por email.
     *
     * @tags Project Invites
     * @name InviteControllerCreateInvite
     * @summary Convidar um usuário para um projeto
     * @request POST:/projects/invites
     * @secure
     */
    inviteControllerCreateInvite: (data: CreateInviteDTO, params: RequestParams = {}) =>
      this.request<InviteResponseDTO, void>({
        path: `/projects/invites`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Aceita um convite para participar de um projeto. Se o usuário não existir, ele será criado.
     *
     * @tags Project Invites
     * @name InviteControllerAcceptInvite
     * @summary Aceitar um convite para um projeto
     * @request POST:/projects/invites/accept
     */
    inviteControllerAcceptInvite: (data: AcceptInviteDTO, params: RequestParams = {}) =>
      this.request<UserResponseDTO, void>({
        path: `/projects/invites/accept`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tasks
     * @name TasksControllerCreate
     * @summary Create a new task in a project
     * @request POST:/projects/{projectId}/tasks
     * @secure
     */
    tasksControllerCreate: (projectId: string, data: CreateTaskDTO, params: RequestParams = {}) =>
      this.request<TaskResponseDTO, any>({
        path: `/projects/${projectId}/tasks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tasks
     * @name TasksControllerFindMany
     * @summary Get all tasks from a project
     * @request GET:/projects/{projectId}/tasks
     * @secure
     */
    tasksControllerFindMany: (projectId: string, params: RequestParams = {}) =>
      this.request<TaskResponseDTO[], any>({
        path: `/projects/${projectId}/tasks`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tasks
     * @name TasksControllerFindOne
     * @summary Get a task by id from a project
     * @request GET:/projects/{projectId}/tasks/{id}
     * @secure
     */
    tasksControllerFindOne: (projectId: string, id: string, params: RequestParams = {}) =>
      this.request<TaskResponseDTO, any>({
        path: `/projects/${projectId}/tasks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tasks
     * @name TasksControllerUpdate
     * @summary Update a task in a project
     * @request PUT:/projects/{projectId}/tasks/{id}
     * @secure
     */
    tasksControllerUpdate: (projectId: string, id: string, data: UpdateTaskDTO, params: RequestParams = {}) =>
      this.request<TaskResponseDTO, any>({
        path: `/projects/${projectId}/tasks/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tasks
     * @name TasksControllerRemove
     * @summary Delete a task from a project
     * @request DELETE:/projects/{projectId}/tasks/{id}
     * @secure
     */
    tasksControllerRemove: (projectId: string, id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${projectId}/tasks/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
