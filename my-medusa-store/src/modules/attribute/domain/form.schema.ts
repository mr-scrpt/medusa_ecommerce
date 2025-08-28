import { jsonString } from "@/shared/lib/zod";
import { AttributeFieldType } from "./type";
import { z } from "zod";

const AttributeCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  handle: z.string().min(1, "Handle is required"),
  type: z.nativeEnum(AttributeFieldType),
  filterable: z.boolean().default(false),
  metadata: jsonString,
  // metadata: z.string(),
});

export type AttributeCreateForm = z.infer<typeof AttributeCreateSchema>;

const AttributeValueCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),

  rank: z.number().default(0),
  metadata: jsonString,
  // metadata: z.string(),
});

export type AttributeValueCreateForm = z.infer<
  typeof AttributeValueCreateSchema
>;

export const AttributeRelationCreateFormSchema = z.object({
  attributeData: AttributeCreateSchema,
  valueListData: z.array(AttributeValueCreateSchema),
});

export type AttributeRelationCreateForm = z.infer<
  typeof AttributeRelationCreateFormSchema
>;
