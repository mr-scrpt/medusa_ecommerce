import { model } from "@medusajs/framework/utils";

export enum AttributeType {
  MULTI = "multi",
  SINGLE = "single",
  BOOLEAN = "boolean",
  RANGE = "range",
}

const Attribute = model.define("attribute", {
  id: model.id().primaryKey(),
  name: model.text(),
  handle: model.text().unique(),
  type: model.enum(AttributeType),
  filterable: model.boolean().default(false),
  metadata: model.json().nullable(),
});

export default Attribute;
