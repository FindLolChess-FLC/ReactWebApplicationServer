export type ApiForm = {
  bodyData?: object;
  method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
  lastUrl: string;
  token?: string;
};
