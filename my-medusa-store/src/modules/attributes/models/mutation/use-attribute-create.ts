// src/admin/hooks/use-create-attribute.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "@medusajs/ui";
import { sdk } from "@/shared/lib/medusa";

export type AttributeCreatePayload = {
  name: string;
  handle: string;
  type: string;
  filterable: boolean;
  metadata?: unknown;
  values: { value: string; rank?: number; metadata?: unknown }[];
};

export const useAttributeCreate = () => {
  return useMutation({
    mutationFn: async (data: AttributeCreatePayload) => {
      // предположим, что у вас есть кастомный маршрут
      // POST /admin/attributes
      return sdk.client.fetch("/admin/attributes", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      toast.success("Attribute created successfully");
    },
    onError: (e: any) => {
      toast.error(
        `Failed to create attribute: ${e?.message ?? "Unknown error"}`,
      );
    },
  });
};
