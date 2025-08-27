import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ATTRIBUTE_MODULE } from "../index";
import {
  createAttributeWorkflow,
  WorkflowInput as CreateWorkflowInput,
} from "../workflows/create-attribute";
import {
  updateAttributeWorkflow,
  WorkflowInput as UpdateWorkflowInput,
} from "../workflows/update-attribute";

export async function getAttribute(req: MedusaRequest, res: MedusaResponse) {
  const attributeModuleService = req.scope.resolve(ATTRIBUTE_MODULE);
  const attribute = await attributeModuleService.retrieveAttribute(
    req.params.id,
    req.retrieveConfig,
  );
  res.status(200).json({ attribute });
}

export async function listAttributes(req: MedusaRequest, res: MedusaResponse) {
  const attributeModuleService = req.scope.resolve(ATTRIBUTE_MODULE);
  const [attributeList, count] =
    await attributeModuleService.listAndCountAttributes(
      req.filterableFields,
      req.listConfig,
    );
  res.status(200).json({ attributeList, count });
}

export async function createAttribute(req: MedusaRequest, res: MedusaResponse) {
  console.log("output_log:  =>>>", req.body);
  // const { result } = await createAttributeWorkflow(req.scope).run({
  //   input: req.body as CreateWorkflowInput,
  // });
  // res.status(201).json({ attribute: result });
}

export async function updateAttribute(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await updateAttributeWorkflow(req.scope).run({
    input: { ...req.body, id: req.params.id } as UpdateWorkflowInput,
  });
  res.status(200).json({ attribute: result });
}
