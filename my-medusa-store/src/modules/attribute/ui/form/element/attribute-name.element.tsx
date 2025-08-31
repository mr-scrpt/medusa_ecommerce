import { Input } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeNameElementProps = ComponentProps<typeof Input>;

export const AttributeNameElement = (props: AttributeNameElementProps) => {
  const { children, ...rest } = props;
  return <Input {...rest} placeholder="e.g. Color" />;
};
