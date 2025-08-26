import { MedusaService } from "@medusajs/framework/utils";
import AttributeSchema from "../models/attribute";
import AttributeValue from "../models/attribute-value";

class AttributeModuleService extends MedusaService({
  Attribute: AttributeSchema,
  AttributeValue,
}) {}

export default AttributeModuleService;
