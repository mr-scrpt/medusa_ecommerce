import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { ATTRIBUTE_MODULE } from "../..";
import { AttributeCreatePayload } from "../../interface.type";
import AttributeModuleService from "../../service/service";

export const createAttributeStep = createStep(
  "create-attribute-step",

  async (data: AttributeCreatePayload, { container }) => {
    const attributeModuleService =
      container.resolve<AttributeModuleService>(ATTRIBUTE_MODULE);

    const [createdAttribute] = await attributeModuleService.createAttributes([
      data,
    ]);

    return new StepResponse(createdAttribute, { id: createdAttribute.id });
  },
  async (undoData, { container }) => {
    if (!undoData?.id) return;
    const attributeModuleService =
      container.resolve<AttributeModuleService>(ATTRIBUTE_MODULE);
    await attributeModuleService.deleteAttributes(undoData.id);
  },
);
