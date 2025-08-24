import { model } from "@medusajs/framework/utils";

const AttributeValue = model.define("attribute_value", {
  id: model.id().primaryKey(),
  value: model.text(),
  rank: model.number().default(0),
  attribute_id: model.text().index(), // Связь с моделью Attribute
  metadata: model.json().nullable(),
});

export default AttributeValue;
