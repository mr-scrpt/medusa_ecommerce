
import { ATTRIBUTE_MODULE } from "@/modules/attributes";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

type UpdateAttributeStepInput = {
  id: string;
  name?: string;
  handle?: string;
  type?: string;
  filterable?: boolean;
  metadata?: Record<string, unknown>;
};

type UpdateAttributeValuesStepInput = {
  attribute_id: string;
  values: {
    id?: string;
    value: string;
    rank?: number;
    metadata?: Record<string, unknown>;
  }[];
};

export const updateAttributeStep = createStep(
  "update-attribute-step",
  async (data: UpdateAttributeStepInput, { container }) => {
    const attributeModuleService = container.resolve(ATTRIBUTE_MODULE);

    const [updatedAttribute] = await attributeModuleService.updateAttributes(
      data.id,
      {
        name: data.name,
        handle: data.handle,
        type: data.type,
        filterable: data.filterable,
        metadata: data.metadata,
      },
    );

    return new StepResponse(updatedAttribute);
  },
);

export const updateAttributeValuesStep = createStep(
  "update-attribute-values-step",
  async (data: UpdateAttributeValuesStepInput, { container }) => {
    const attributeModuleService = container.resolve(ATTRIBUTE_MODULE);

    const existingValues = await attributeModuleService.listAttributeValues({
      attribute_id: data.attribute_id,
    });

    const toCreate = data.values.filter((v) => !v.id);
    const toUpdate = data.values.filter((v) => !!v.id);
    const toDelete = existingValues.filter(
      (ev) => !data.values.some((v) => v.id === ev.id),
    );

    if (toCreate.length > 0) {
      await attributeModuleService.createAttributeValues(
        toCreate.map((v) => ({ ...v, attribute_id: data.attribute_id })),
      );
    }

    if (toUpdate.length > 0) {
      await Promise.all(
        toUpdate.map((v) =>
          attributeModuleService.updateAttributeValues(v.id, {
            value: v.value,
            rank: v.rank,
            metadata: v.metadata,
          }),
        ),
      );
    }

    if (toDelete.length > 0) {
      await attributeModuleService.deleteAttributeValues(toDelete.map((v) => v.id));
    }
  },
);
