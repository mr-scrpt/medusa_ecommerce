import { Checkbox } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeIsFilterableElementProps = ComponentProps<typeof Checkbox>;

export const AttributeIsFilterableElement = (
  props: AttributeIsFilterableElementProps,
) => {
  const { children, ...rest } = props;
  return <Checkbox {...rest} />;
};
