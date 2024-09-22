export type ApiForm = {
  data?: object;
  method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
  lastUrl: string;
  token?: string;
};
