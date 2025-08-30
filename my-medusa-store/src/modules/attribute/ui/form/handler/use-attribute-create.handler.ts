import type { ComponentProps } from "react";
import { AttributeRelationCreateForm } from "../../../domain/from-create.schema";
import { useNavigate } from "react-router-dom";
import { useAttributeCreateMutation } from "../../../interface.client";
import { HandlerFormBaseProps } from "@/shared/lib/react-hook-form";

export const useAttributeCreateHandler = (props: HandlerFormBaseProps) => {
  const { callbackUrl, onSuccess, onError } = props;
  const { createAttribute, ...rest } = useAttributeCreateMutation();
  const navigate = useNavigate();

  const handleAttributeCreate = async (data: AttributeRelationCreateForm) => {
    await createAttribute(data, {
      onSuccess: () => {
        onSuccess?.();
        if (callbackUrl) navigate(callbackUrl);
      },
      onError: () => {
        onError?.();
        if (callbackUrl) navigate(callbackUrl);
      },
    });
  };

  return { handleAttributeCreate, ...rest };
};
