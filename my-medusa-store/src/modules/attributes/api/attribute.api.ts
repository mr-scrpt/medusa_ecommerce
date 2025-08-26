import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

import { ATTRIBUTE_MODULE } from "../index";
import {
  createAttributeWorkflow,
  WorkflowInput,
} from "../workflows/create-attribute";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const attributeModuleService = req.scope.resolve(ATTRIBUTE_MODULE);

  const [attributeList, count] =
    await attributeModuleService.listAndCountAttributes(
      req.filterableFields,
      req.listConfig,

      // { ...req.listConfig, relations: ["values"] },
    );

  res.status(200).json({ attributeList, count });
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
