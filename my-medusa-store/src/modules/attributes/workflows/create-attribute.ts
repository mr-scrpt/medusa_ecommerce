import {
  createWorkflow,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import {
  createAttributeStep,
  createAttributeValuesStep,
} from "./steps/create-attribute-steps";

import { AttributeType } from "../domain/type";

export type WorkflowInput = {
  name: string;
  handle?: string;
  type?: string;
  values?: string[];
};
export const createAttributeWorkflow = createWorkflow(
  "create-attribute-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const newAttribute = createAttributeStep(input);

    const valuesInput = transform(
      { newAttribute, input },

      (data: { newAttribute: AttributeType; input: WorkflowInput }) => {
        if (!data.input.values || data.input.values.length === 0) {
          return [];
        }
        return data.input.values.map((value) => ({
          value,
          attribute_id: data.newAttribute.id,
        }));
      },
    );

    createAttributeValuesStep(valuesInput);

    return new WorkflowResponse(newAttribute);
  },
);
