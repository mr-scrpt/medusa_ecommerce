import { MedusaContainer } from "@medusajs/framework";
import { ModuleRegistrationName } from "@medusajs/framework/utils";

/**
 * Этот скрипт удаляет все записи из таблиц attribute и attribute_value.
 * ВНИМАНИЕ: Это необратимая операция. Используйте только в среде разработки.
 */
export default async function handler({
  container,
}: {
  container: MedusaContainer;
}): Promise<void> {
  console.log("🚀 Starting attribute reset script...");

  const attributeModuleService = container.resolve(
    ModuleRegistrationName.ATTRIBUTE,
  );

  try {
    // 1. Сначала получаем и удаляем все значения атрибутов (AttributeValue)
    const attributeValues = await attributeModuleService.listAttributeValues({
      select: ["id"], // Нам нужны только ID для удаления
    });
    const valueIds = attributeValues.map((v) => v.id);

    if (valueIds.length > 0) {
      console.log(`🔥 Deleting ${valueIds.length} attribute values...`);
      await attributeModuleService.deleteAttributeValues(valueIds);
      console.log("✅ Attribute values deleted.");
    } else {
      console.log("✅ No attribute values to delete.");
    }

    // 2. Затем получаем и удаляем все сами атрибуты (Attribute)
    const attributes = await attributeModuleService.listAttributes({
      select: ["id"],
    });
    const attributeIds = attributes.map((a) => a.id);

    if (attributeIds.length > 0) {
      console.log(`🔥 Deleting ${attributeIds.length} attributes...`);
      await attributeModuleService.deleteAttributes(attributeIds);
      console.log("✅ Attributes deleted.");
    } else {
      console.log("✅ No attributes to delete.");
    }

    console.log("✨ Reset complete!");
  } catch (error) {
    console.error("❌ Error during attribute reset:", error);
  }
}
