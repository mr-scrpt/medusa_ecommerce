import { Input } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeHandleElementProps = ComponentProps<typeof Input>;

export const AttributeHandleElement = (props: AttributeHandleElementProps) => {
  const { children, ...rest } = props;
  return <Input {...rest} placeholder="e.g. Color" />;
};
