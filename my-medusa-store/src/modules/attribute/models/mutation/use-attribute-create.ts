// src/admin/hooks/use-create-attribute.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "@medusajs/ui";
import { sdk } from "@/shared/lib/medusa";
import { AttributeRelationCreatePayload } from "../../interface.type";

export const useAttributeCreate = () => {
  return useMutation({
    mutationFn: async (data: AttributeRelationCreatePayload) => {
      return sdk.client.fetch("/admin/attribute", {
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
