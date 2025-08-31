import { Input } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeValueRankElementProps = ComponentProps<typeof Input>;

export const AttributeValueRankElement = (
  props: AttributeValueRankElementProps,
) => {
  const { children, ...rest } = props;
  return <Input {...rest} type="number" placeholder="0" />;
};
