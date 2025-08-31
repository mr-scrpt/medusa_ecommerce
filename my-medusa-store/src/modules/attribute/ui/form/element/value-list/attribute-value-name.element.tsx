import { Input } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeValueNameElementProps = ComponentProps<typeof Input>;

export const AttributeValueNameElement = (
  props: AttributeValueNameElementProps,
) => {
  const { children, ...rest } = props;
  return <Input {...rest} placeholder="e.g. Red" />;
};
