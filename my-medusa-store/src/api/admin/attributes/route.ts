import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ATTRIBUTE_MODULE } from "../../../modules/attributes";
import {
  createAttributeWorkflow,
  WorkflowInput,
} from "../../../workflows/create-attribute";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const attributeModuleService = req.scope.resolve(ATTRIBUTE_MODULE);

  const [attributes, count] =
    await attributeModuleService.listAndCountAttributes(
      req.filterableFields,

      { ...req.listConfig, relations: ["values"] },
    );

  res.status(200).json({ attributes, count });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { result } = await createAttributeWorkflow(req.scope).run({
    input: req.body as WorkflowInput,
  });

  res.status(201).json({ attribute: result });
}
