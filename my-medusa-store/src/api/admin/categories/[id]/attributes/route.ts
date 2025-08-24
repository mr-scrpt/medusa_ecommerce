import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: product_categories } = await query.graph({
    entity: "product_category",
    fields: [
      "id",
      "attributes.id",
      "attributes.name",
      "attributes.handle",
      "attributes.type",
      "attributes.filterable",
      "attributes.metadata",
      "attributes.values.id",
      "attributes.values.value",
      "attributes.values.rank",
    ],
    filters: {
      id: id,
    },
  });

  const attributes = (product_categories[0] as any)?.attributes || [];

  res.status(200).json({ attributes });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const { attribute_id } = req.body as { attribute_id: string };

  const link = req.scope.resolve(ContainerRegistrationKeys.LINK);

  await link.create({
    [Modules.PRODUCT]: {
      product_category_id: id,
    },
    attribute: { // "attribute" is the name of your custom module
      attribute_id: attribute_id,
    },
  });

  res.status(200).json({ message: "Attribute linked successfully" });
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const { id } = req.params;
  const { attribute_id } = req.body as { attribute_id: string };

  const link = req.scope.resolve(ContainerRegistrationKeys.LINK);

  await link.dismiss({
    [Modules.PRODUCT]: {
      product_category_id: id,
    },
    attribute: {
      attribute_id: attribute_id,
    },
  });

  res.status(200).json({ message: "Attribute unlinked successfully" });
}
