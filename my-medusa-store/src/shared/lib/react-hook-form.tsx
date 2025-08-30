export const combineDefaultSchemas = <T extends Record<string, any>>(schemas: {
  [K in keyof T]: T[K];
}): T => {
  return { ...schemas } as T;
};

export interface HandlerFormBaseProps {
  callbackUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
}
