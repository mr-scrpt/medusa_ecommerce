import { z } from "zod";
import {
  AttributeCreateSchema,
  attributeFormDefaultValues,
} from "./attribute.schema";
import {
  AttributeValueCreateSchema,
  attributeValueFormDefaultValues,
} from "./attribute-value.schema";
import { combineDefaultSchemas } from "@/shared/lib/react-hook-form";

export const AttributeRelationCreateFormSchema = z.object({
  attributeData: AttributeCreateSchema,
  valueListData: z.array(AttributeValueCreateSchema),
});

export type AttributeRelationCreateForm = z.infer<
  typeof AttributeRelationCreateFormSchema
>;

export const defaultAttributeRelationCreateForm =
  combineDefaultSchemas<AttributeRelationCreateForm>({
    attributeData: attributeFormDefaultValues,
    valueListData: [attributeValueFormDefaultValues],
  });
