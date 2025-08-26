// // src/steps/create-attribute-steps.ts
//
// import { createStep, StepResponse } from "@medusajs/workflows-sdk"; // 1. Импортируем StepResponse
// import { ATTRIBUTE_MODULE } from "../../modules/attributes";
// import { AttributeFieldType } from "../../modules/attributes/models/attribute";
//
// // Типы для входных данных остались те же
// type CreateAttributeStepInput = {
//   name: string;
//   handle?: string;
//   type?: AttributeFieldType;
// };
//
// type CreateAttributeValuesStepInput = {
//   value: string;
//   attribute_id: string;
// }[];
//
// // Шаг 1: Создание основного атрибута
// export const createAttributeStep = createStep(
//   "create-attribute-step",
//   async (data: CreateAttributeStepInput, { container }) => {
//     const attributeModuleService = container.resolve(ATTRIBUTE_MODULE);
//
//     const [createdAttribute] = await attributeModuleService.createAttributes([
//       data,
//     ]);
//
//     // 2. Оборачиваем результат в new StepResponse()
//     return new StepResponse(createdAttribute);
//   },
// );
//
// // Шаг 2: Создание связанных значений атрибута (остается без изменений)
// export const createAttributeValuesStep = createStep(
//   "create-attribute-values-step",
//   async (data: CreateAttributeValuesStepInput, { container }) => {
//     if (!data || data.length === 0) {
//       return; // Этот шаг ничего не возвращает, поэтому здесь все в порядке
//     }
//     const attributeModuleService = container.resolve(ATTRIBUTE_MODULE);
//
//     await attributeModuleService.createAttributeValues(data);
//   },
// );
