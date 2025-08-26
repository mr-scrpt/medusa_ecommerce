import { model } from "@medusajs/framework/utils";
import AttributeSchema from "./attribute";
import { InferTypeOf } from "@medusajs/framework/types";

const AttributeValue = model.define("attribute_value", {
  id: model.id().primaryKey(),
  value: model.text(),
  rank: model.number().default(0),
  // attribute_id: model.text().index(), // Связь с моделью Attribute
  metadata: model.json().nullable(),
  attribute: model.belongsTo(() => AttributeSchema, {
    foreignKey: "attribute_id",
  }),
});
export type AttributeValueType = InferTypeOf<typeof AttributeValue>;

export default AttributeValue;
