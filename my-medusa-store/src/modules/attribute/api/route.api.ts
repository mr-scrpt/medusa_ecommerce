export const API_ATTRIBUTE_ENDPOINT = {
  BASE: "/admin/attribute",

  QUERY: {
    GET_LIST: "/admin/attribute",
    GET_BY_ID: (id: string) => `/admin/attribute/${id}`,
  },
  MUTATION: {
    CREATE: "/admin/attribute",
    UPDATE: (id: string) => `/admin/attribute/${id}`,
    DELETE: (id: string) => `/admin/attribute/${id}`,
  },
} as const;
