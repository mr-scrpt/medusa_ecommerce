import { Input } from "@medusajs/ui";
import { ComponentProps } from "react";

type AttributeValueValueElementProps = ComponentProps<typeof Input>;

export const AttributeValueValueElement = (
  props: AttributeValueValueElementProps,
) => {
  const { children, ...rest } = props;
  return <Input {...rest} placeholder="e.g. #FF0000" />;
};
