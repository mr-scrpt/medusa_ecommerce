import type { ComponentProps } from "react";
import { AttributeRelationCreateForm } from "../../domain/from-create.schema";

export const UseAttributeCreateHandler = (
  data: AttributeRelationCreateForm,
) => {
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createAttribute(data);
      navigate("/attribute");
    } catch (error) {
      console.error("Failed to create attribute", error);
    }
  });
};
