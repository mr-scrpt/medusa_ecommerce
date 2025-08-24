import { model } from "@medusajs/framework/utils";
import AttributeValue from "./attribute-value";
import { InferTypeOf } from "@medusajs/framework/types";

export enum AttributeFieldType {
  MULTI = "multi",
  SINGLE = "single",
  BOOLEAN = "boolean",
  RANGE = "range",
}

const Attribute = model.define("attribute", {
  id: model.id().primaryKey(),
  name: model.text(),
  handle: model.text().unique(),
  type: model.enum(AttributeFieldType),
  filterable: model.boolean().default(false),
  metadata: model.json().nullable(),
  values: model.hasMany(() => AttributeValue, {
    foreignKey: "attribute_id",
  }),
});

export type AttributeType = InferTypeOf<typeof Attribute>;

export default Attribute;
