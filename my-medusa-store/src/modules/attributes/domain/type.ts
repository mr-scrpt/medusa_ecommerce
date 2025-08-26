import { InferTypeOf } from "@medusajs/framework/types";
import AttributeSchema from "../models/attribute";

export enum AttributeFieldType {
  MULTI = "multi",
  SINGLE = "single",
  BOOLEAN = "boolean",
  RANGE = "range",
}
export const ATTRIBUTE_RELATION_FIELDS = {
  fields: "values.*",
};

export type AttributeType = Omit<InferTypeOf<typeof AttributeSchema>, "values">;
export type AttributeRelationType = InferTypeOf<typeof AttributeSchema>;
